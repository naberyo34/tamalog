---
title: "ブラウザで動くアゲアゲなシンセサイザーをWeb Audio APIで作った話"
date: "20211220"
tags: ["プログラミング", "JavaScript", "Web Audio API"]
thumbnail: "thumbnail.png"
---

**※この記事は[Qiita](https://qiita.com/naberyo34/items/7aa5e2f610b5895e9f6b)に投稿した記事の再掲です。**

アゲアゲな年末を過ごすために、JavaScriptのちょっとマニアックなAPI「[Web Audio API](https://developer.mozilla.org/ja/docs/Web/API/Web_Audio_API)」を用いてシーケンサー機能付きのシンセサイザーを作成しました。

![koodori.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/262435/3fd254b2-f869-6e1a-2412-820913552842.png)

実物は[こちら](https://koodori.netlify.app/)から動かせるので、まずはぜひ遊んでみてください！全体のコードや、操作方法は[リポジトリ](https://github.com/naberyo34/koodori)にございます。

## はじめに

Web Audio APIはブラウザ上で音声制御を行うことができるJavaScriptのAPIです。やや独特な仕組みを持ち少々とっつきにくい部分もありますが、工夫次第で本格的な音声制御も可能な数多くの機能を持っています。

本記事では、今回の実装でも利用している

- 基本的な概念「`Node`」「`connect`」について
- 音声のテンポを合わせる方法
- 音声合成
- wavファイルの再生
- 音量変更
- フィルター
- エフェクト(ディレイ、リバーブ)の作り方

をテーマに、Web Audio APIの機能や使い方を解説します。本記事の内容を大まかに理解することで、アイデア次第で様々な応用ができると思います。

### 注意点

本記事に記載しているコードは説明のために省略、簡略化しているため、[リポジトリ](https://github.com/naberyo34/koodori)の内容とは異なります。必要に応じて、実際のコードを併せて確認しながら読んでいただければと思います。

## 開発環境

- TypeScript 4.5.4
- webpack 5.65.0
- HTML
- CSS
- Netlify

特別な内容はないため、環境構築手順は割愛します。

## 基本的な概念「Node」「connect」について

Web Audio APIを触るとすぐにお目にかかる、以下のようなコードがあります。

```typescript
const audioCtx = new AudioContext();
const oscNode = new OscillatorNode(audioCtx, { type: 'sawtooth', frequency: 440 });
const gainNode = new GainNode(audioCtx, { gain: 0.5 });

oscNode.connect(gainNode);
gainNode.connect(audioCtx.destination);

oscNode.start();
```

あまり馴染みのない書き方でちょっと面食らいますが、これは文字通り**「音響機材を作成、接続」しているイメージ**でとらえると分かりやすいです。

まず1行目では「`AudioContext`」というWeb Audio APIを動かすための土台を作成していまます。この「`AudioContext`」は利用時に一度立ち上げるだけでよいです。

![audioAPI.001.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/262435/6180877b-9edc-6eeb-7b49-19ffb47212ae.png)

その後、上記のコードでいう`gainNode`や`oscNode`などの「機材」を「`connect`(接続)」　していきます。`Node`にはいろいろな種類がありますが、大きく分けると楽器のように「**音を出すもの**」とエフェクターのように「**音を加工するもの**」の2種類に分けられます。

注意点として、`Node`は最終的に`destination`に接続されていないと音が出ません。どれだけオーディオ機器をたくさん繋いでも、スピーカーが接続されていないと音は出ないのと同じイメージですね。

![audioAPI.002.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/262435/0e16c762-b5fd-c346-321c-2e6d2425c0e0.png)

アプリを作成するときは、作成したい機能に応じて、どのようにルーティングを行うべきかをある程度イメージしておくと実装がしやすいと思います。

## 音声のテンポを合わせる方法

Web Audio APIは「音のテンポを合わせる」実装がちょっと難しく、工夫が必要です。

JavaScript標準のタイマー系機能は音楽用途で利用できるほど正確ではなく、容易にズレが生じます。そのため、今回のアプリのように「指定したBPMで16分音符ごとに音が鳴る」ような実装は、単純な`setTimeout`や`setInterval`だけだと実現することができません。

そこで今回は、テンポ同期の仕組みとして[こちらの記事](https://www.html5rocks.com/ja/tutorials/audio/scheduling/)で解説されているアプローチを採用しました。

`setInterval`と、Web Audio APIで取得できる`currentTime`というパラメータを併用することで、正確なタイミングでの発音を「先読み予約」し、長時間ループ再生を行ってもズレが発生しないようにしています。

上記記事の作例として用意されている[メトロノームの実装](https://github.com/cwilso/metronome/)は非常に参考になるので、ぜひチェックしてみてください。

## 音声合成(OscillatorNode)

ここからは、Web Audio APIで利用できる代表的な`Node`をご紹介します。

Web Audio APIはあらかじめ収録された音をロードして鳴らすだけでなく、内部で音声合成を行う機能を持っています。

`OscillatorNode`というNodeを利用することで、4種の波形を任意の周波数で鳴らすことができます。

```typescript
// 440Hz (A4)の高さで鋸波を発音する
const oscNode = new OscillatorNode(audioCtx, { type: 'sawtooth', frequency: 440 });
oscNode.connect(audioCtx.destination);

oscNode.start();
```

![audioAPI.003.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/262435/a6b2980c-8349-52e3-1cde-3a297a0f44e9.png)

音の高さは数値で指定する必要があるため、周波数と音名の対応表を調べてリスト化しておくとスムーズに実装が行えると思います。参考までに、今回は以下のような関数を作成して対応しました。

```typescript
/**
 * 音名を周波数に変換して返す
 * @param pitchName 音名 (c2 - b5)
 * @returns 周波数
 */
const pitchNameToFrequency = (pitchName: PitchName): number => {
  const table = {
    c2: 65.406,
    'c#2': 69.296,
    d2: 73.416,
    'd#2': 77.782,
    e2: 82.407,
    f2: 87.307,
    'f#2': 92.499,
    g2: 97.999,
    'g#2': 103.826,
    a2: 110,
    'a#2': 116.541,
    b2: 123.471,
    c3: 130.813,
    'c#3': 138.591,
    d3: 146.832,
    'd#3': 155.563,
    e3: 164.814,
    f3: 174.614,
    'f#3': 184.997,
    g3: 195.998,
    'g#3': 207.652,
    a3: 220,
    'a#3': 233.082,
    b3: 246.942,
    // (以下略)
  };

  return table[pitchName];
};
```

## wavファイルの再生(SourceNode)

今回のアプリにはドラムマシン機能があり、キック、スネア、ハイハットの3種の音色を16分のパターンで打ち込むことができます。このドラムの音色は、先述した音声合成ではなくあらかじめ作曲ツールを用いて収録したオーディオファイル(wav)を用いています。

オーディオファイルの再生自体は通常のaudioタグ等でも可能ですが、Web Audio APIではファイルを`AudioBuffer`という形式に変換して読み込むことで、リアルタイムでテンポに同期したり、エフェクトをかけることができるようになっています。

```typescript
// 指定したオーディオファイルをAudioBufferに変換する関数
const setupSample = async (samplePath: string) => {
  const response = await fetch(samplePath);
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
  return audioBuffer;
};

// バスドラムのwavをAudioBufferに変換
const kickBuffer = await setupSample('assets/audio/kick.wav');
```

変換したオーディオは`SourceNode`という`Node`で読み込むことができます。この`SourceNode`は、先ほど登場した`OscillatorNode`などの`Node`と同じように扱うことができます。

```typescript
// SourceNodeを用いてwavファイルを再生
let kickNode = audioCtx.createBufferSource();
kickNode.buffer = kickBuffer;
kickNode.connect(audioCtx.destination);
kickNode.start();
```

![audioAPI.004.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/262435/9f2d69b2-140f-ccdb-5687-2cd2f7f78828.png)

##  音量変更(GainNode)

先述した`OscillatorNode`や`SourceNode`は「音を出すための`Node`」ですが、続いて「音を加工する`Node`」を見ていきましょう。

中でも最もシンプルなのは「原音の音量を変えて出力する」`GainNode`です。

```typescript
const gainNode = new GainNode(audioCtx, { gain: 0.5 });
const oscNode = new OscillatorNode(audioCtx, { type: 'sawtooth', frequency: 440 });

oscNode.connect(gainNode);
gainNode.connect(audioCtx.destination);

// oscNode は gainNode を通るため、gain(音量)が0.5で出力される
oscNode.start();
```

![audioAPI.005.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/262435/e2262842-6163-eb86-43df-4446664aee1c.png)

単純ではありますが利用機会も多く、「全体の音量を調節する」「エフェクトの音量だけ変える」など、ルーティング次第で様々な用途で利用することができます。

なお、`Node`のパラメーターは再代入によって変更が可能なので、`input`タグから受け取った値を反映させることで、ユーザーがグリグリと動かすことができるようになります。

```typescript
// ここでは、あらかじめ「masterGainNode」という全体のボリュームを制御するGainNodeを作成しています
const handleChangeMasterVolume = (e: Event) => {
  if (!(e.currentTarget instanceof HTMLInputElement)) return;
  const value = Number(e.currentTarget.value);
  if (value < 0 || value > 50) {
    alert('無効な値です。');
    return;
  }
  masterGainNode.gain.value = value;
};
```

## フィルター(BiquadFilterNode)

ある周波数の音をカットする「フィルター」はサウンドメイクに欠かせませんが、これは`BiquadFilterNode`という`Node`を利用することで実装できます。

```typescript
// 1000Hz以上の帯域をカットするローパスフィルター
const filterNode = new BiquadFilterNode(audioCtx, {
    type: 'lowpass',
    frequency: 1000,
    Q: 10,
  });
```

実際に`connect`して使うと以下のようになります。

```typescript
const oscNode = new OscillatorNode(audioCtx, { type: 'sawtooth', frequency: 440 });
oscNode.connect(filterNode);
filterNode.connect(audioCtx.destination);

// 1000Hz以上がカットされた、A4の鋸波が鳴る
oscNode.start();
```

![audioAPI.006.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/262435/ab6da1f7-c828-5e5d-924e-78322ac8198d.png)

## エフェクト(ディレイ、リバーブ)の作り方

ここからは少し複雑になります。

ディレイやリバーブといったエフェクトは一般的に「エフェクトで得られたサウンド(WET)」と「原音(DRY)」を**混ぜて**鳴らします。そのため、さきほどのフィルターとは異なり、`connect`が1本道ではなくなります。

### ディレイ(DelayNode)

Web Audio APIのディレイは`DelayNode`によって実装できるのですが、この`DelayNode`は非常にシンプルな仕組みで、

- 原音と同じ音を、指定した時間だけ遅らせてもう一度鳴らす

という機能**だけ**を持っています。

シンセやエレキギターなどで利用されるディレイといえば、反響音が何度も繰り返されながら減衰していくサウンドを思い浮かべる方が多いと思います。このようなサウンドを得るためには、少しだけ実装に工夫が必要です。

```typescript
const oscNode = new OscillatorNode(audioCtx, { type: 'sawtooth', frequency: 440 });
const delayNode = new DelayNode(audioCtx, { delayTime: 1 });
const delayFeedBackNode = new GainNode(audioCtx, { gain: 0.75 });

// 原音
oscNode.connect(audioCtx.destination);
// ディレイ
oscNode.connect(delayNode);
delayNode.connect(delayFeedBackNode);
delayFeedBackNode.connect(delayNode);
delayNode.connect(audioCtx.destination);
```

![audioAPI.007.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/262435/70ca1602-f75c-6824-cd9c-75b2ffa1abd6.png)

`delayNode`によって発音されたサウンドが、`GainNode`である`delayFeedBackNode`を通って再び`delayNode`に戻ってくるようなループ状のルーティングになっています。この方法で、少しずつ音が小さくなって減衰するような反響音を表現することができます。

### リバーブ(ConvolverNode)

Web Audio APIのリバーブ`ConvolverNode`は「[コンボリューションリバーブ](https://info.shimamura.co.jp/digital/support/2017/09/117986)」で、残響データ(インパルスレスポンス)を用いて原音を加工する仕組みになっています。

今回は、あらかじめ作曲ツールで作成したインパルスレスポンスを読み込んで利用しています。読み込む際に`AudioBuffer`に変換するのは、先に紹介したドラムのwavファイルと同様です。

```typescript
const oscNode = new OscillatorNode(audioCtx, { type: 'sawtooth', frequency: 440 });
// setupSample はドラムの解説でも使用した自作の関数です
const impulse = await setupSample('assets/audio/impulse.wav');
const convolverNode = new ConvolverNode(audioCtx, {
    buffer: impulse,
  });

// 原音
oscNode.connect(audioCtx.destination);
// リバーブ
oscNode.connect(convolverNode);
convoloverNode.connect(audioCtx.destination);
```

![audioAPI.008.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/262435/848d0e2d-fe1a-c9a3-7d61-4f4668832715.png)

`convolverNode`が発音するのは残響音**のみ**なので、原音と混ぜて`destination`に送ることでリバーブエフェクトらしいサウンドを得ることができます。

## その他のポイント

その他、今回の実装で工夫したいくつかのポイントを紹介します。

### クリック後にAPIの初期化を行う

Web Audio APIは音声を扱うAPIなので、ページを開いたら勝手に再生されるような実装は避け、ユーザーの許可を待つように実装することが望ましいです(多くの環境で、ユーザー操作を待たずにAudioContextを初期化するような処理を書くと警告が出ます)。今回はアクセス時の「START」ボタンを押してから初期化が始まるようにしています。

[参考](https://developer.mozilla.org/ja/docs/Web/Media/Autoplay_guide)

![koodori_start.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/262435/854636ee-4b16-9425-5a41-45dab4af65d8.png)

### シンセのフィルターと全体のフィルターを2つ用意する

OSCのセクションにあるフィルターとEFFECTのセクションにある「DJ-FILTER」はどちらも`BiquadFilterNode`で作成したフィルターですが、ルーティングが異なります。シンセのフィルターはドラムパートのサウンドには影響しない一方で、「DJ-FILTER」は**演奏全体**に効果を及ぼすようにしています。

前者は主にオシレーターの音作り用として、後者は演奏中の飛び道具エフェクトとして利用するようなイメージで作成しました。

### input type="range"のノブ実装
特定範囲の値をコントロールできる`input type="range"`はもともとスライダー型のUIなのですが、シンセといえば「丸いツマミ(ノブ)」をグリグリ回す操作がおなじみです。自前実装はけっこう面倒なので、今回は[こちら](https://g200kg.github.io/input-knobs/)のライブラリを利用しました。

## おわりに

今回のアプリはWebアプリケーションの強みである「ブラウザさえあればいつでも音が鳴らせる手軽さ」を活かして、「専門知識がなくてもすぐ遊べる」ように作ってみました。

フレーズを再生しながらツマミをグリグリして、Web Audio APIの音声制御機能を体感していただければ幸いです！

## 参考記事

- [MDN](https://developer.mozilla.org/ja/docs/Web/API/Web_Audio_API)
- [HTML5 Rocks - Web Audio API の基礎](https://www.html5rocks.com/ja/tutorials/webaudio/intro/)
- [HTML5 Rocks - 2 つの時計のお話 - Web Audio の正確なスケジューリングについて](https://www.html5rocks.com/ja/tutorials/webaudio/intro/)
- [ics.media - 音を操るWeb技術 - Web Audio API入門](https://ics.media/entry/200427/)
- [WEB SOUNDER - Web Audio API 解説](https://weblike-curtaincall.ssl-lolipop.jp/portfolio-web-sounder/webaudioapi-effectors/delay-reverb)
