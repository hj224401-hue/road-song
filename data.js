/* 书页、选段、书签、标注、音频统一配置。框坐标为原图比例0—1。 */
window.MOON_DATA={
 title:'循句找歌 · 月亮',commonOpening:'月亮出来月亮黄',subtitle:'同一句起词，两种处境',
 source:'刘兆吉《西南采风录》，商务印书馆，1946 年，国家图书馆藏本 NCL-004652747。',
 bookUrl:'https://upload.wikimedia.org/wikipedia/commons/f/fb/NCL-004652747_%E8%A5%BF%E5%8D%97%E9%87%87%E9%A2%A8%E9%8C%84.pdf',
 market:'assets/images/market.jpeg',direction:'rtl',orderVerified:false,
 segments:[{id:'love',label:'情歌选页',start:70,end:79},{id:'war',label:'抗日歌谣选页',start:151,end:160}],
 bookmarks:[{song:'love303',segment:'love',page:74,label:'寻郎 · 74–75 页'},{song:'war14',segment:'war',page:155,label:'送郎 · 155–156 页'}],
 pages:Object.fromEntries([...Array.from({length:10},(_,i)=>70+i),...Array.from({length:10},(_,i)=>151+i)].map(n=>[n,{
  number:n,pdfPage:n+18,src:`assets/book/xinan-caifenglu-p${String(n).padStart(3,'0')}.png`,available:false,verified:false,
  thumb:[74,75,155,156].includes(n)?`assets/thumbs/reference-p${n}.png`:'',thumbnailOnly:[74,75,155,156].includes(n),annotations:[]
  // 核对后 annotations:[{song:'love303',x:.1,y:.2,w:.1,h:.3,lineIds:['love-second']}]
 }])),
 songs:[
  {id:'love303',title:'寻郎',collection:'情歌',number:303,pages:[74,75],segment:'love',excerptLabel:'第二句节选',excerpt:'跟着月亮来寻郎',accent:'寻',recording:{src:'assets/audio/xunlang.mp3',label:'AI 谱曲与演唱',credit:'',version:'',duration:25.58},lines:[{id:'love-second',text:'跟着月亮来寻郎',pages:[74,75],audio:null}]},
  {id:'war14',title:'送郎',collection:'抗日歌谣',number:14,pages:[155,156],segment:'war',excerptLabel:'末句节选 · 中间歌词略',excerpt:'不如送郎到战场',accent:'送',recording:{src:'assets/audio/songlang.mp3',label:'AI 谱曲与演唱',credit:'',version:'',duration:24.3},lines:[{id:'war-last',text:'不如送郎到战场',pages:[155,156],audio:null}]},
  {id:'huangping2',title:'替他缝件棉背心',collection:'抗日歌谣',number:2,pages:[],homeSection:'huangping',place:'贵州黄平',excerptLabel:'前四句',accent:'',recording:{src:'assets/audio/mianbeixin.m4a',label:'AI 谱曲与演唱',credit:'',version:'',duration:25.728},lines:[
   {id:'huangping-1',text:'拿起线来抽起针',audio:null},
   {id:'huangping-2',text:'想起前线作战人',audio:null},
   {id:'huangping-3',text:'不绣鸳鸯和蝴蝶',audio:null},
   {id:'huangping-4',text:'替他缝件棉背心',audio:null}
  ]}
 ]
};
// 整段：recording.src='assets/audio/love303.mp3'；不设时间点则播放整段，不猜测逐句高亮。
// 同首录音句子：lines[0].audio={start:12.4,end:17.8}；独立片段：{src:'assets/audio/line2.mp3'}。
// 标签：演唱版本 / 当地读音 / AI 谱曲与演唱 / 当代编曲 · AI 演唱。
// recording.credit 为署名，version 为词句差异说明；无法对应的歌句不设区间。

// 已对照本地完整扫描页核对的目标歌辞框。不改动既有音频与歌句配置。
const scanAnnotations={
  "74": [
    {
      "song": "love303",
      "x": 0.008009153318077803,
      "y": 0.6,
      "w": 0.05148741418764302,
      "h": 0.18333333333333332,
      "lineIds": [
        "love-second"
      ]
    },
    {
      "song": "love303",
      "x": 0.06636155606407322,
      "y": 0.6,
      "w": 0.05034324942791762,
      "h": 0.18333333333333332,
      "lineIds": []
    }
  ],
  "75": [
    {
      "song": "love303",
      "x": 0.8710045662100456,
      "y": 0.11466666666666667,
      "w": 0.1050228310502283,
      "h": 0.18533333333333332,
      "lineIds": []
    }
  ],
  "155": [
    {
      "song": "war14",
      "x": 0.09038901601830664,
      "y": 0.5593333333333333,
      "w": 0.05034324942791762,
      "h": 0.18066666666666667,
      "lineIds": []
    }
  ],
  "156": [
    {
      "song": "war14",
      "x": 0.7557077625570776,
      "y": 0.11266666666666666,
      "w": 0.0502283105022831,
      "h": 0.18333333333333332,
      "lineIds": [
        "war-last"
      ]
    },
    {
      "song": "war14",
      "x": 0.8162100456621004,
      "y": 0.11266666666666666,
      "w": 0.10388127853881278,
      "h": 0.18333333333333332,
      "lineIds": []
    }
  ]
};
for(const [n,boxes] of Object.entries(scanAnnotations)){if(!window.MOON_DATA.pages[n].annotations.length)window.MOON_DATA.pages[n].annotations=boxes;}
