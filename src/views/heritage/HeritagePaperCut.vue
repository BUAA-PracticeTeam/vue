<script setup lang="ts">
import { ref } from 'vue'

const sections = ref([
  {
    id: 1,
    title: '一剪之趣\n夺神工于指尖',
    content: '苗族剪纸，不仅是民间手工艺，更是苗族历史文化的“活化石”。苗族剪纸起源于古代苗族先民对自然的崇拜与图腾的信仰，流传于湖南绥宁、贵州雷山等地。2008年，苗族剪纸被列入第二批国家级非物质文化遗产扩展项目名录。2024年，苗族剪纸入选贵州省第六批省级非物质文化遗产代表性项目名录。不同于北方剪纸的粗犷，苗族剪纸以其独特的锯齿纹、细腻的线条和深厚的巫傩文化底蕴，在中华剪纸艺术林中独树一帜。',
    img: 'https://placehold.co/800x600/c0392b/ffffff?text=Paper+Cut',
    layout: 'left'
  },
  {
    id: 2,
    title: '专注与精雕\n铸就美丽',
    content: '苗族剪纸艺术精湛绝妙，主要依赖于剪、刻、扎等多种技巧的灵活运用，而实施这些技巧的工具则包括各式各样的剪刀、刻刀与锥子。苗族剪纸艺人首先在皮纸上描绘出心中的图案，接着使用捻制的皮纸钉，巧妙地将绘有图案的纸张与多层叠放的皮纸牢牢固定，以此保证在剪切时每一层皮纸都能精准对齐，然后利用剪刀和刻刀依照图案进行剪裁，最终制作出一张或多张完全相同的剪纸图案。',
    img: 'https://placehold.co/800x600/c0392b/ffffff?text=Paper+Cut',
    layout: 'right'
  },
  {
    id: 3,
    title: '一半烟火\n一半神灵',
    content: '苗族剪纸内容广泛，苗家合拢宴、放羊、刺绣、舞龙舞狮，记录着苗寨的日出而作，日落而息；神秘的巫傩面具，以红黑对比的色彩，寄托着驱邪纳吉的愿望。这些作品展现了苗族人民对自然的崇敬、对族源的追溯以及对生命的礼赞，深刻反映了苗族人民丰富多彩的内心世界，同时也寄托着他们对美好生活的无限憧憬与向往。',
    img: 'https://placehold.co/800x600/c0392b/ffffff?text=Paper+Cut',
    layout: 'left'
  },
  {
    id: 4,
    title: '万物有灵\n纹样皆语',
    content: '在苗族剪纸中，没有无缘无故的线条,每一个符号都是一句无声的语言，具有其独到的美感。独特的锯齿纹，赋予了剪纸作品表达动态的能力，其表现的虚实过渡的柔和与线条的犀利相碰撞，赋予作品强烈的视觉冲击感。流畅细腻的线条，准确精炼地勾勒出对象的造型，生动形象地刻画人物的神态。纹样与线条的整合，给人完整而丰富的视觉享受。',
    img: 'https://placehold.co/800x600/c0392b/ffffff?text=Paper+Cut',
    layout: 'right'
  },
  {
    id: 5,
    title: '薪火相传\n生生不息',
    content: '每一张剪纸的背后，都是一位老艺人几十年的坚守。如今，数字技术不断发展，我们相信会有越来越多的人了解苗家剪纸，感受其独特的艺术气息与厚重的文化底蕴。我们相信在技术飞速发展的今天，苗族剪纸将继续作为中华民族传统文化的代表之一，刻画我们共同的过往、当下与未来。',
    img: 'https://placehold.co/800x600/c0392b/ffffff?text=Paper+Cut',
    layout: 'left'
  }
])
</script>

<template>
  <!-- TODO: 替换占位图片 -->

  <div class="scroll-container">
    <section class="scroll-section hero-section">
      <div class="hero-content">
        <h1>苗家剪纸</h1>
        <p class="hero-subtitle">纸上乾坤，苗韵千秋</p>
        <div class="scroll-tip">向下滑动探索 <br/> &darr;</div>
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
    url('https://placehold.co/1920x1080/e52d27/ffffff?text=Paper+Cut+Hero+Image');

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
}
</style>
