import React from 'react'
import Container from 'react-bootstrap/Container'

class CourseInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      c_sid: props.c_sid,
      c_intro:
        `<h2>BC 能夠更帥氣的騎車技巧大公開-基礎篇</h2>
<p>自行車騎士總是希望能常保帥氣的姿態，有鑑於此，本單元特地網羅了騎車前、騎車時、騎車後保持帥氣的要點跟方法！BiCYCLE CLUB特地請到日本知名的管洋介選手，來教大家10大帥氣騎車的重點！

技巧1　起步

首先是流暢的起步方法，從推著座墊的狀態行雲流水般的靈活起步，讓人看起來就像個幹練老手的技巧，作為一個帥氣的自行車騎士，這個步驟是必學的！

1.從推著座墊步行的狀態開始，右側曲柄在10點鐘方向的角度起步是最合適的。
2.在步行的速度下大步向前走到自行車靠前方處，握住把手。
3.瞬間停止推動座墊，舉起右腳躍上，身體動作要練到行雲流水般的流暢。
4.利用躍上的慣性來踩動自行車，迅速讓雙腳姿勢變為騎車姿勢。
5.在利用慣性前進的自行車上，先讓右腳扣片成2點鐘的角度套進卡踏。
6.接著再套進左腳卡踏，這樣就完成起步了！接著就能準備衝刺消失在路人的視線中。

技巧2　推著自行車步行

下車後與自行車在一起時，騎士的基本姿勢，就是以單手推著座墊後方步行。起步上車時由此姿勢開始，從腳踏車上落地時也採用此推車姿勢來收尾，就會相當帥。

雖然常見的姿勢是雙手推著把手前進的姿勢，但是這樣身體或自行車容易變得傾斜，身體容易彎腰駝背顯得很疲憊，又會偶爾碰撞到踏板，很難筆直向前走。

POINT
筆直前進時，車體保持筆直、輕輕握持著自行車座墊是關鍵，要向右轉彎時將車體向右輕輕傾斜，就能朝該方向前進。（在狹窄或人多場所請勿執行）

技巧3　坐在自行車上

騎在愛車上的停止姿勢也很重要，輕輕彎曲膝蓋，用放鬆的姿勢坐在上管上。右腳維持套在卡式踏板上的狀態，游刃有餘的準備起步。

POINT1
微微彎曲膝蓋，保持上體放鬆。要點在於不要讓後背繃緊挺直，右膝彎曲成L型壓低姿勢，上體微微前傾，這樣就很帥氣了！左手則以手腕靠在把手上放鬆。

POINT2
輕鬆坐在上管，曲柄在2點鐘到3點鐘位置，雖說是坐在上管，但要將身體的重量分配到左腳上，並不是扎實坐下的感覺，而是微微靠左。

下一頁：沒有最帥，只有更帥的著陸方式


技巧4　等紅綠燈

仔細注意紅綠燈的秒數，事先估算速度就能盡量減少下車的機會，這樣是最瀟灑的。真的需要停車時，先從容的減速再以左腳著地，輕鬆的坐在自行車上管。急忙起步與緊急煞車都會累積身體的負擔，所以要盡量避免！

1.使曲柄呈水平，人採站立姿勢，這時候若紅綠燈信號變了就能直接繼續騎。
2.自行車完全停止後，將左腳從踏板上鬆脫著地，同時臀部離開座墊。
3.右腳保持在踏板上放鬆等待，不因為等紅燈而顯得煩躁的從容態度是很重要的。

技巧5　從自行車上落地

在基礎篇中難度較高的帥氣自行車著地法，一邊避開座墊開腿著地，同時要輕推把手，是比較困難的地方。偷偷練習到能夠自然而然地做出這樣的動作吧！

1.在7點鐘左右的位置鬆開左腳卡踏，以位於1點鐘處的右腳輕輕踩踏繼續前進。
2.從左腳開始著地，由座墊上下來，同時也解開右腳的卡踏。
3.避開座墊將身體往後縮，抬起右腳從自行車上下來，注意不要碰撞到座墊。
4.從自行車下來的瞬間輕輕向前推把手，車體在沒有騎士的狀態下會自行前進。
5.著地瞬間用右手抓住座墊，這就是帥氣的重點。
6.當完成從自行車上下來的動作後，自然轉變成直接用座墊推車的姿勢。</p>`,
    }
  }

  render() {
    return (
      <>
        <Container fluid>
          {/*<div dangerouslySetInnerHTML={{__html: this.state.c_intro}} />*/}
          <div dangerouslySetInnerHTML={{__html: this.props.courseInfo}} style={{fontSize: '1.2rem'}} />
          {/*<p>{this.props.courseInfo}</p>*/}
        </Container>
      </>
    )
  }
}

export default CourseInfo
