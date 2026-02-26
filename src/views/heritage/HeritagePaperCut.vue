<script setup lang="ts">
import { ref } from 'vue'
import downArrowSvg from '@/assets/svg/down-arrow.svg?raw'
import paperCut1 from '@/assets/img/heritage/paper-cut/1.jpg'
import paperCut2 from '@/assets/img/heritage/paper-cut/2.jpg'
import paperCut3 from '@/assets/img/heritage/paper-cut/3.jpg'
import paperCut4 from '@/assets/img/heritage/paper-cut/4.jpg'
import paperCut5 from '@/assets/img/heritage/paper-cut/5.jpg'

const sections = ref([
  {
    id: 1,
    title: '一剪之趣\n夺神工于指尖',
    content: '苗族剪纸，不仅是民间手工艺，更是苗族历史文化的“活化石”。苗族剪纸起源于古代苗族先民对自然的崇拜与图腾的信仰，流传于湖南绥宁、贵州雷山等地。2008年，苗族剪纸被列入第二批国家级非物质文化遗产扩展项目名录。2024年，苗族剪纸入选贵州省第六批省级非物质文化遗产代表性项目名录。不同于北方剪纸的粗犷，苗族剪纸以其独特的锯齿纹、细腻的线条和深厚的巫傩文化底蕴，在中华剪纸艺术林中独树一帜。',
    img: paperCut1,
    layout: 'left'
  },
  {
    id: 2,
    title: '专注与精雕\n铸就美丽',
    content: '苗族剪纸艺术精湛绝妙，主要依赖于剪、刻、扎等多种技巧的灵活运用，而实施这些技巧的工具则包括各式各样的剪刀、刻刀与锥子。苗族剪纸艺人首先在皮纸上描绘出心中的图案，接着使用捻制的皮纸钉，巧妙地将绘有图案的纸张与多层叠放的皮纸牢牢固定，以此保证在剪切时每一层皮纸都能精准对齐，然后利用剪刀和刻刀依照图案进行剪裁，最终制作出一张或多张完全相同的剪纸图案。',
    img: paperCut2,
    layout: 'right'
  },
  {
    id: 3,
    title: '一半烟火\n一半神灵',
    content: '苗族剪纸内容广泛，苗家合拢宴、放羊、刺绣、舞龙舞狮，记录着苗寨的日出而作，日落而息；神秘的巫傩面具，以红黑对比的色彩，寄托着驱邪纳吉的愿望。这些作品展现了苗族人民对自然的崇敬、对族源的追溯以及对生命的礼赞，深刻反映了苗族人民丰富多彩的内心世界，同时也寄托着他们对美好生活的无限憧憬与向往。',
    img: paperCut3,
    layout: 'left'
  },
  {
    id: 4,
    title: '万物有灵\n纹样皆语',
    content: '在苗族剪纸中，没有无缘无故的线条,每一个符号都是一句无声的语言，具有其独到的美感。独特的锯齿纹，赋予了剪纸作品表达动态的能力，其表现的虚实过渡的柔和与线条的犀利相碰撞，赋予作品强烈的视觉冲击感。流畅细腻的线条，准确精炼地勾勒出对象的造型，生动形象地刻画人物的神态。纹样与线条的整合，给人完整而丰富的视觉享受。',
    img: paperCut4,
    layout: 'right'
  },
  {
    id: 5,
    title: '薪火相传\n生生不息',
    content: '每一张剪纸的背后，都是一位老艺人几十年的坚守。如今，数字技术不断发展，我们相信会有越来越多的人了解苗家剪纸，感受其独特的艺术气息与厚重的文化底蕴。我们相信在技术飞速发展的今天，苗族剪纸将继续作为中华民族传统文化的代表之一，刻画我们共同的过往、当下与未来。',
    img: paperCut5,
    layout: 'left'
  }
])

const references = ref([
  {
    text: '剪纸（苗族剪纸）-百度百科',
    url: 'https://baike.baidu.com/item/%E5%89%AA%E7%BA%B8%EF%BC%88%E8%8B%97%E6%97%8F%E5%89%AA%E7%BA%B8%EF%BC%89/54050607'
  },
  {
    text: '苗疆纸艺——黔东南苗族剪纸艺术专题展-黔东南博物馆',
    url: 'http://www.qdnzmb.com/linshizhanlan/248.html'
  },
  {
    text: '湖南绥宁：苗家剪纸进校园，开出最美“非遗传承之花”-央广网',
    url: 'https://news.cnr.cn/local/dftj/20240115/t20240115_526558853.shtml'
  }
])
</script>

<template>
  <div class="scroll-container">
    <section class="scroll-section hero-section">
      <div class="hero-content">
        <h1>苗家剪纸</h1>
        <p class="hero-subtitle">纸上乾坤，苗韵千秋</p>
        <div class="scroll-tip">
          向下滑动探索
          <br />
          <span class="scroll-tip-icon" v-html="downArrowSvg" aria-hidden="true"></span>
        </div>
      </div>
    </section>

    <section
      v-for="item in sections"
      :key="item.id"
      class="scroll-section content-section"
    >
      <div class="content-box" :class="{ 'reverse-layout': item.layout === 'right' }">
        <div class="image-wrapper">
          <img :src="item.img" :alt="item.title" />
        </div>
        <div class="text-wrapper">
          <h2>{{ item.title }}</h2>
          <p>{{ item.content }}</p>
        </div>
      </div>
    </section>

    <section class="scroll-section footer-section">
      <div class="footer-card">
        <h3>参考资料与创作声明</h3>

        <div class="footer-content">
          <div class="reference-group">
            <h4>参考资料</h4>
            <ul>
              <li v-for="(refItem, index) in references" :key="index">
                <a
                  v-if="refItem.url"
                  :href="refItem.url"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  [{{ index + 1 }}] {{ refItem.text }}
                </a>
                <span v-else>
                  [{{ index + 1 }}] {{ refItem.text }}
                </span>
              </li>
            </ul>
          </div>

          <div class="copyright-group">
            <h4>创作声明</h4>
            <p>本文案由“蒲公英-乡野航迹实践队”原创整理，部分内容由AI生成。</p>
            <p>部分图片来源于网络，仅作非遗公益展示，如有侵权请联系删除。</p>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>

.scroll-container {
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.scroll-container::-webkit-scrollbar {
  display: none;
}

.scroll-section {
  height: 100vh;
  width: 100%;
  scroll-snap-align: start;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.hero-section {
  background:
    linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url('../../assets/img/heritage/paper-cut/hero.jpg');

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  color: white;
  text-align: center;
  padding: 0 20px;
}
.hero-content h1 {
  font-size: 4rem;
  margin-bottom: 20px;
}
.scroll-tip {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  animation: bounce 2s infinite;
  opacity: 0.8;
}

.scroll-tip-icon {
  display: inline-block;
}

.scroll-tip-icon :deep(svg) {
  width: 0.95em;
  height: 0.95em;
  display: block;
  color: currentColor;
}

.content-box {
  width: 80%;
  max-width: 1200px;
  display: flex;
  background: white;
  box-shadow: 0 15px 40px rgba(0,0,0,0.1);
  border-radius: 20px;
  overflow: hidden;
}

.image-wrapper, .text-wrapper {
  flex: 1;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.text-wrapper {
  padding: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.text-wrapper h2 {
  font-size: 2.5rem;
  margin-bottom: 50px;
  color: #333;
  position: relative;
  text-align: left;
  white-space: break-spaces;
}

.text-wrapper h2::after {
  content: '';
  position: absolute;
  bottom: -16px;
  left: 0;
  width: 160px;
  height: 6px;
  background-color: #c0392b;
}

.text-wrapper p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
  text-align: justify;
}

.reverse-layout {
  flex-direction: row-reverse;
}

.footer-section {
  background-color: #f5f7fa;
}

.footer-card {
  width: 80%;
  max-width: 800px;
  background: white;
  padding: 60px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  text-align: center;
  max-height: 80vh;
  overflow-y: auto;
}

.footer-card h3 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 40px;
  position: relative;
  display: inline-block;
}

.footer-card h3::after {
  content: '';
  display: block;
  width: 60px;
  height: 4px;
  background-color: #c0392b;
  margin: 15px auto 0;
}

.footer-content {
  text-align: left;
  color: #555;
}

.reference-group, .copyright-group {
  margin-bottom: 30px;
}

.footer-content h4 {
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 15px;
  border-left: 4px solid #c0392b;
  padding-left: 10px;
}

.reference-group ul {
  list-style: none;
  padding: 0;
}

.reference-group li {
  margin-bottom: 10px;
  font-size: 0.95rem;
  line-height: 1.6;
}

.reference-group li a {
  color: #c0392b;
  text-decoration: none;
}

.reference-group li a:hover {
  text-decoration: underline;
}

.copyright-group p {
  margin-bottom: 8px;
  font-size: 0.95rem;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {transform: translateX(-50%) translateY(0);}
  40% {transform: translateX(-50%) translateY(-10px);}
  60% {transform: translateX(-50%) translateY(-5px);}
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 3rem;
  }

  .content-box {
    flex-direction: column;
    width: 90%;
    margin-top: 0;
  }

  .reverse-layout {
    flex-direction: column;
  }

  .image-wrapper {
    flex: none;
    height: 35%;
    width: 100%;
  }

  .text-wrapper {
    flex: 1;
    padding: 24px;
    justify-content: flex-start;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .text-wrapper h2 {
    font-size: 1.8rem;
    margin-bottom: 36px;
  }

  .text-wrapper h2::after {
    bottom: -8px;
    height: 4px;
    width: 100px;
  }

  .text-wrapper p {
    font-size: 1rem;
    line-height: 1.6;
  }

  .footer-card {
    width: 90%;
    padding: 30px 20px;
    max-height: 85vh;
  }

  .footer-card h3 {
    font-size: 1.5rem;
    margin-bottom: 30px;
  }

  .footer-content h4 {
    font-size: 1.1rem;
  }

  .reference-group li, .copyright-group p {
    font-size: 0.9rem;
  }
}
</style>
