<script setup lang="ts">
import { ref } from 'vue'

const sections = ref([
  {
    id: 1,
    title: '缬韵千年\n青出于蓝',
    content: '布上青花，古韵悠长。扎染，古称“绞缬”，是大理地区最具代表性的传统手工技艺，被誉为“布上的青花瓷” 。这项技艺的历史可追溯至东汉，至唐代南诏时期已臻成熟，彼时舞队赴长安献艺，所着舞衣“裙襦鸟兽草木，文以八彩杂革”，便是中原与西南文化交融的见证 。明清时期，染布行会兴起，洱海卫红布与大理布名噪一时 。2006年，这项凝聚着白族人民生活智慧的技艺，被列入第一批国家级非物质文化遗产名录 。从苍山洱海到巍山古城，这抹蓝白，穿越千年时光，依旧熠熠生辉。',
    img: '/src/assets/img/heritage/tie-dye/1.jpg',
    layout: 'left'
  },
  {
    id: 2,
    title: '撮彩结线\n草木染心',
    content: '千针万线，始成一物。扎染的制作延续古法，核心在于“扎”与“染”的精妙配合 。匠人甄选透气亲肤的棉麻白布，以苍山脚下的板蓝根提取天然蓝靛为染料，辅以栀子果、苏木等植物，色泽温润自然 。工艺之魂在于“扎花”，匠人运用捆、缝、扎、叠等百余种手法，将布料悉心束缚 。正如古籍所载：“撮彩以线结之，而后染色，既染，则解其结，凡结处皆原色，余则入染色矣” 。布料在染缸中历经十余次浸染与氧化，每一次颜色的沉淀，都是匠心与时光的对话。',
    img: '/src/assets/img/heritage/tie-dye/2.jpg',
    layout: 'right'
  },
  {
    id: 3,
    title: '晕色天成\n冰纹若梦',
    content: '万物有灵，肌理天成。扎染的独特魅力，在于其无法复制的自然之美。经过反复浸染与拆线漂洗后，蓝白交界处会自然舒展出独特的“冰裂纹” 。这种由手工扎结和自然晕染形成的肌理，宛若苍山雪、洱海月，是机器无法模拟的非遗质感 。蝴蝶花、小圆菊等传统纹样跃然布上，不仅构图严谨，更在色彩的由浅入深中，展现出草木原本的温润与质朴 。每一块扎染，都是人工技艺与自然造化的完美合奏。',
    img: '/src/assets/img/heritage/tie-dye/3.jpg',
    layout: 'left'
  },
  {
    id: 4,
    title: '蓝白相伴\n岁岁安澜',
    content: '扎染早已超越了单纯的技艺，深深融入了白族人的生命历程 。从新生儿的襁褓，到婚嫁时的“麒麟送子”被单，再到日常的头巾、衣物与桌布，这抹蓝白串联起人生每一个重要时刻，寓意着姻缘美满与子孙绵延 。如今，扎染更打破传统边界，化身时尚时装、家居软装与精致文创，将东方美学带入现代生活 。它既是白族最鲜明的民族标识，也是寄托人们对美好生活向往的载体 。',
    img: '/src/assets/img/heritage/tie-dye/4.jpg',
    layout: 'right'
  },
  {
    id: 5,
    title: '匠心守望\n古技新辉',
    content: '每一件扎染作品背后，都藏着传承人的坚守与创新。在巍山与大理周城，依托“公司+农户”的模式，古老的技艺已发展为带动百姓增收的亿元产业 。从建立非遗博物馆到制定《白族扎染技艺规范》，从走进国际时尚舞台到开展校企合作，官方与民间正携手构建全方位的保护体系 。我们相信，在传统与现代的碰撞中，这份蓝白交织的千年匠心，将在新时代绽放出更耀眼的光彩，继续刻画我们共同的过往与未来。',
    img: '/src/assets/img/heritage/tie-dye/5.jpg',
    layout: 'left'
  }
])

const references = ref([
  {
    text: '扎染-百度百科',
    url: 'https://baike.baidu.com/item/%E6%89%8E%E6%9F%93/2660805#2'
  },
  {
    text: '白族扎染技艺-百度百科',
    url: 'https://baike.baidu.com/item/%E7%99%BD%E6%97%8F%E6%89%8E%E6%9F%93%E6%8A%80%E8%89%BA/5852309#1'
  },
  {
    text: '白族扎染技艺-中国非物质文化遗产网',
    url: 'https://www.ihchina.cn/project_details/14304.html'
  },
  {
    text: '白族扎染技艺-云南非物质文化遗产保护网',
    url: 'https://www.ynich.cn/item/148.html'
  },
  {
    text: '資治通鑒 (胡三省音注) / 卷232-维基文库',
    url: 'https://zh.wikisource.org/wiki/%E8%B3%87%E6%B2%BB%E9%80%9A%E9%91%92_(%E8%83%A1%E4%B8%89%E7%9C%81%E9%9F%B3%E6%B3%A8)/%E5%8D%B7232'
  }
])
</script>

<template>
  <div class="scroll-container">
    <section class="scroll-section hero-section">
      <div class="hero-content">
        <h1>巍山扎染</h1>
        <p class="hero-subtitle">苍洱流蓝，布里生花</p>
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
    url('/src/assets/img/heritage/tie-dye/hero.jpg');

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
  background-color: #005BAC;
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
  background-color: #005BAC;
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
  border-left: 4px solid #005BAC;
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
  color: #005BAC;
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
