<script>
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import chinaGeoJson from '../assets/china.json'
import ChatBot from '@/components/ChatBot.vue'
import ChatWindow from '@/components/ChatWindow.vue'
import ImageCarousel from '@/components/ImageCarousel.vue'

export default defineComponent({
  name: 'AboutPage',
  components: {
    ChatBot,
    ChatWindow,
    ImageCarousel,
  },
  setup() {
    const aboutImages = [
      new URL('@/assets/img/aboutBG.png', import.meta.url).href,
      new URL('@/assets/img/aboutBG2.jpg', import.meta.url).href,
    ]
    const footprints = [
      '2025年7月，赴云南省大理市支教、调研',
      '2025年1月，赴湖北省恩施州社会调研',
      '2024年7月，赴贵州省黔东南苗族侗族自治州乡村支教',
      '2024年1月，赴山东省济南市环保宣传',
      '2023年7月，赴北京市房山区社区服务',
    ]
    const chinaMap = ref(null)
    const isChatOpen = ref(false)
    const typewriterText = ref('')
    const fullText = '心随风扬 奔赴希望'
    const testimonialSection = ref(null)
    const activeIndicator = ref(0)
    let typewriterInterval = null
    let isDeleting = false
    let currentIndex = 0
    let handleScroll = null
    let handleIndicatorClick = null

    const handleToggleChat = (open) => {
      isChatOpen.value = open
    }

    const handleCloseChat = () => {
      isChatOpen.value = false
    }

    const updateScrollIndicators = () => {
      if (!testimonialSection.value) return

      const scrollContainer = testimonialSection.value.querySelector('.testimonials-grid')
      if (!scrollContainer) return

      const cards = Array.from(scrollContainer.querySelectorAll('.testimonial-card'))
      if (cards.length === 0) return

      const indicators = Array.from(testimonialSection.value.querySelectorAll('.indicator'))

      if (cards.length < 6 || indicators.length < 6) {
        console.warn('需要至少6张卡片和6个指示器')
        return
      }

      const updateActiveIndicator = (index) => {
        activeIndicator.value = index
        indicators.forEach((indicator, i) => {
          indicator.classList.toggle('active', i === index)
        })
      }

      const getCardPosition = (index) => {
        // 计算每张卡片的精确位置
        const cardWidth = 240 // 卡片宽度
        const cardMargin = 19 // 卡片间距 (1.2rem = 19.2px)

        return index * (cardWidth + cardMargin)
      }

      handleScroll = () => {
        const scrollLeft = scrollContainer.scrollLeft

        let currentIndex = 0
        let minDistance = Number.MAX_VALUE

        for (let i = 0; i < 6; i++) {
          const cardPosition = getCardPosition(i)
          const distance = Math.abs(scrollLeft - cardPosition)

          if (distance < minDistance) {
            minDistance = distance
            currentIndex = i
          }
        }

        if (currentIndex !== activeIndicator.value) {
          updateActiveIndicator(currentIndex)
        }
      }

      handleIndicatorClick = (index) => {
        const scrollPosition = getCardPosition(index)

        scrollContainer.scrollTo({
          left: scrollPosition,
          behavior: 'smooth',
        })

        updateActiveIndicator(index)
      }

      scrollContainer.addEventListener('scroll', handleScroll)

      indicators.forEach((indicator, index) => {
        if (index < 6) {
          indicator.style.cursor = 'pointer'
          indicator.addEventListener('click', () => handleIndicatorClick(index))
        }
      })

      updateActiveIndicator(0)
    }

    const startTypewriter = () => {
      typewriterInterval = setInterval(() => {
        if (!isDeleting) {
          if (currentIndex < fullText.length) {
            typewriterText.value = fullText.slice(0, currentIndex + 1)
            currentIndex++
          } else {
            setTimeout(() => {
              isDeleting = true
            }, 2000)
          }
        } else {
          if (currentIndex > 0) {
            typewriterText.value = fullText.slice(0, currentIndex - 1)
            currentIndex--
          } else {
            isDeleting = false
            setTimeout(() => {
              currentIndex = 0
            }, 1000)
          }
        }
      }, 150)
    }

    onMounted(() => {
      startTypewriter()

      echarts.registerMap('china', chinaGeoJson)
      const myChart = echarts.init(chinaMap.value)
      myChart.setOption({
        geo: {
          map: 'china',
          roam: true,
          itemStyle: {
            areaColor: '#e0e0e0',
            borderColor: '#0288d1',
            borderWidth: 1,
          },
          emphasis: {
            itemStyle: {
              areaColor: '#ffcc00',
            },
          },
          regions: [
            { name: '北京市', itemStyle: { areaColor: '#42a5f5' } },
            { name: '云南省', itemStyle: { areaColor: '#42a5f5' } },
            { name: '湖北省', itemStyle: { areaColor: '#42a5f5' } },
            { name: '贵州省', itemStyle: { areaColor: '#42a5f5' } },
            { name: '山东省', itemStyle: { areaColor: '#42a5f5' } },
            { name: '甘肃省', itemStyle: { areaColor: '#42a5f5' } },
            { name: '广东省', itemStyle: { areaColor: '#42a5f5' } },
          ],
        },
        series: [
          {
            type: 'map',
            map: 'china',
            geoIndex: 0,
            data: [],
          },
        ],
      })
      window.addEventListener('resize', () => myChart.resize())

      updateScrollIndicators()
    })

    onUnmounted(() => {
      if (typewriterInterval) {
        clearInterval(typewriterInterval)
      }

      // 清理用户评价滚动事件监听器
      if (testimonialSection.value && handleScroll && handleIndicatorClick) {
        const scrollContainer = testimonialSection.value.querySelector('.testimonials-grid')
        const indicators = Array.from(testimonialSection.value.querySelectorAll('.indicator'))

        if (scrollContainer) {
          scrollContainer.removeEventListener('scroll', handleScroll)
        }

        indicators.forEach((indicator, index) => {
          if (index < 6) {
            indicator.removeEventListener('click', () => handleIndicatorClick(index))
          }
        })
      }
    })

    return {
      aboutImages,
      footprints,
      chinaMap,
      isChatOpen,
      typewriterText,
      handleToggleChat,
      handleCloseChat,
      testimonialSection,
      activeIndicator,
    }
  },
})
</script>

<template>
  <div class="about-page">
    <div>
      <section class="banner">
        <div class="banner-content">
          <h1 class="animate__animated animate__fadeInDown">蒲公英乡野航迹实践队</h1>
          <p class="animate__animated animate__fadeInUp animate__delay-1s typewriter-text">
            {{ typewriterText }}<span class="cursor">|</span>
          </p>
        </div>
      </section>
    </div>

    <!-- 走马灯图片展示 -->
    <ImageCarousel />

    <div class="container">
      <div class="section-title">
        <h2>团队简介</h2>
      </div>
      <div class="about-content">
        <div class="about-text">
          <p>
            蒲公英乡野航迹实践队成立于2023年，是一支由北京航空航天大学计算机学院自发组织的志愿服务团队。我们致力于社会调研、乡村支教、环境保护等公益实践活动，旨在通过实际行动服务社会、锻炼自我。
          </p>
          <p>
            经过三年的发展，团队已从最初的10人发展到现在的50余人，累计开展各类实践活动100余次，服务时长超过5000小时，足迹遍布全国多个省市自治区。
          </p>
          <p>
            我们的宗旨是："奉献、友爱、互助、进步"，希望通过我们的努力，能够为社会带来积极的改变，同时也让每一位队员在实践中成长、收获。
          </p>
        </div>
        <div class="about-image">
          <el-carousel height="320px" indicator-position="inside">
            <el-carousel-item v-for="img in aboutImages" :key="img">
              <img :src="img" alt="团队合影" />
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
    <!-- 团队足迹卡片 -->
    <div class="container">
      <div class="section-title">
        <h2>团队足迹</h2>
      </div>
      <div class="about-footprint-content">
        <div ref="chinaMap" class="china-map"></div>
        <div class="footprint-list">
          <div class="footprint-item" v-for="item in footprints" :key="item">{{ item }}</div>
        </div>
      </div>
    </div>

    <!-- 用户评价 -->
    <div class="container">
      <div class="section-title">
        <h2>看看大家怎么说？</h2>
      </div>
      <div class="testimonials-section" ref="testimonialSection">
        <div class="testimonials-grid">
          <div class="testimonial-card">
            <img src="@/assets/img/logo/remin.png" alt="人民日报" class="company-logo-img" />
            <p class="testimonial-text">
              蒲公英实践队的支教活动展现了新时代青年的责任担当，他们用实际行动诠释了"奉献、友爱、互助、进步"的志愿精神。
            </p>
            <div class="user-info">
              <span class="user-name">人民日报</span>
              <span class="user-title">官方媒体</span>
            </div>
          </div>
          <div class="testimonial-card">
            <img src="@/assets/img/logo/toutiao.png" alt="今日头条" class="company-logo-img" />
            <p class="testimonial-text">
              看到蒲公英实践队在乡村的支教故事，深受感动。他们不仅传授知识，更传递了希望和梦想，是新时代青年的榜样。
            </p>
            <div class="user-info">
              <span class="user-name">今日头条</span>
              <span class="user-title">资讯平台</span>
            </div>
          </div>
          <div class="testimonial-card">
            <img src="@/assets/img/logo/bilibili.png" alt="B站" class="company-logo-img" />
            <p class="testimonial-text">
              在B站看到蒲公英实践队的支教视频，他们的环保宣传活动很有创意，用新媒体传播正能量，值得点赞！
            </p>
            <div class="user-info">
              <span class="user-name">B站</span>
              <span class="user-title">视频平台</span>
            </div>
          </div>
          <div class="testimonial-card">
            <img src="@/assets/img/logo/douyin.png" alt="抖音" class="company-logo-img" />
            <p class="testimonial-text">
              抖音上蒲公英实践队的支教记录很真实感人，他们用镜头记录下乡村孩子们的笑容，传递了温暖和希望。
            </p>
            <div class="user-info">
              <span class="user-name">抖音</span>
              <span class="user-title">短视频平台</span>
            </div>
          </div>
          <div class="testimonial-card">
            <img src="@/assets/img/logo/kuaishou.png" alt="快手" class="company-logo-img" />
            <p class="testimonial-text">
              快手上看到蒲公英实践队的乡村调研，他们深入基层了解民情，用数据说话，展现了当代大学生的社会责任感。
            </p>
            <div class="user-info">
              <span class="user-name">快手</span>
              <span class="user-title">短视频平台</span>
            </div>
          </div>
          <div class="testimonial-card">
            <img src="@/assets/img/logo/xiaohongshu.png" alt="小红书" class="company-logo-img" />
            <p class="testimonial-text">
              小红书上蒲公英实践队的分享很用心，他们的环保宣传活动很有创意，用新媒体传播环保理念，让更多人关注公益。
            </p>
            <div class="user-info">
              <span class="user-name">小红书</span>
              <span class="user-title">生活方式平台</span>
            </div>
          </div>
        </div>
        <!-- 滚动指示点 -->
        <div class="scroll-indicators">
          <span class="indicator active"></span>
          <span class="indicator"></span>
          <span class="indicator"></span>
          <span class="indicator"></span>
          <span class="indicator"></span>
          <span class="indicator"></span>
        </div>
      </div>
    </div>

    <!-- 聊天小人和聊天窗口 -->
    <ChatBot @toggle-chat="handleToggleChat" />
    <ChatWindow :is-open="isChatOpen" @close="handleCloseChat" />
  </div>
</template>

<style scoped>
.banner {
  height: 400px;
  background: url('https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')
    center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  position: relative;
  margin-bottom: 3rem;
  border-radius: 8px;
  overflow: hidden;
}

.banner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.banner-content {
  position: relative;
  z-index: 1;
  padding: 0 20px;
}

.banner h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.banner p {
  font-size: 1.2rem;
  max-width: 800px;
  margin: 0 auto;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.typewriter-text {
  font-family: 'Courier New', monospace;
  letter-spacing: 2px;
}

.cursor {
  animation: blink 1s infinite;
  color: #ffcc00;
  font-weight: bold;
}

@keyframes blink {
  0%,
  50% {
    opacity: 1;
  }
  51%,
  100% {
    opacity: 0;
  }
}

/* 保持原有about样式不变 */
.about-page {
  padding-top: 100px;
}

.section-title {
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
}

.section-title h2 {
  font-size: 2rem;
  color: #2989d8;
  display: inline-block;
  padding-bottom: 10px;
}

.section-title h2:after {
  content: '';
  position: absolute;
  width: 80px;
  height: 3px;
  background: #ffcc00;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

.container {
  width: 70%;
  margin: 0 auto;
  background-color: #ffffff;
  padding: 3rem;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  margin-bottom: 3rem;
}

.about-content {
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 2rem;
}

.about-text {
  flex: 1;
  text-align: left;
}

.about-image {
  flex: 1;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  height: 320px;
}

.about-image img {
  width: 100%;
  height: 320px;
  object-fit: cover;
  display: block;
}

.about-image:hover img {
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .about-content {
    flex-direction: column;
  }

  .about-image {
    order: -1;
    margin-bottom: 1.5rem;
  }
}

.about-footprint-content {
  display: flex;
  align-items: stretch;
  justify-content: center;
  gap: 2.5rem;
}

.china-map {
  width: 420px;
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(41, 137, 216, 0.08);
  background: #f5faff;
  flex-shrink: 0;
}

.footprint-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.2rem;
  min-width: 260px;
  text-align: left;
}

.footprint-item {
  background: #e3f2fd;
  color: #1565c0;
  border-radius: 12px;
  padding: 1rem 1.2rem;
  font-size: 1.08rem;
  box-shadow: 0 1px 4px rgba(41, 137, 216, 0.06);
  font-weight: 500;
  line-height: 1.6;
}

/* 用户评价样式 */
.testimonials-section {
  margin-top: 2rem;
}

.testimonials-grid {
  display: flex;
  gap: 1.2rem;
  overflow-x: auto;
  padding: 1rem 0;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.testimonials-grid::-webkit-scrollbar {
  display: none;
}

.testimonial-card {
  min-width: 240px;
  max-width: 240px;
  background: #ffffff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  border: 1px solid #f0f0f0;
  transition: all 0.3s ease;
  position: relative;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
}

.testimonial-card:hover {
  transform: translateY(-2px);
}

/* 人民日报 - 红色边框 */
.testimonial-card:nth-child(1) {
  border: 2px solid #cb1720;
}

.testimonial-card:nth-child(1):hover {
  border-color: #a01219;
  box-shadow: 0 4px 20px rgba(203, 23, 32, 0.15);
}

/* 今日头条 - 橙红色边框 */
.testimonial-card:nth-child(2) {
  border: 2px solid #e8260d;
}

.testimonial-card:nth-child(2):hover {
  border-color: #c01f0b;
  box-shadow: 0 4px 20px rgba(232, 38, 13, 0.15);
}

/* B站 - 粉色边框 */
.testimonial-card:nth-child(3) {
  border: 2px solid #d4237a;
}

.testimonial-card:nth-child(3):hover {
  border-color: #b01c62;
  box-shadow: 0 4px 20px rgba(212, 35, 122, 0.15);
}

/* 抖音 - 黑色边框 */
.testimonial-card:nth-child(4) {
  border: 2px solid #111111;
}

.testimonial-card:nth-child(4):hover {
  border-color: #000000;
  box-shadow: 0 4px 20px rgba(17, 17, 17, 0.15);
}

/* 快手 - 橙色边框 */
.testimonial-card:nth-child(5) {
  border: 2px solid #ff4a08;
}

.testimonial-card:nth-child(5):hover {
  border-color: #e03d07;
  box-shadow: 0 4px 20px rgba(255, 74, 8, 0.15);
}

/* 小红书 - 红色边框 */
.testimonial-card:nth-child(6) {
  border: 2px solid #fe0000;
}

.testimonial-card:nth-child(6):hover {
  border-color: #cc0000;
  box-shadow: 0 4px 20px rgba(254, 0, 0, 0.15);
}

.company-logo-img {
  width: 48px;
  height: 48px;
  object-fit: contain;
  margin-bottom: 0.8rem;
  border-radius: 6px;
}

/* 人民日报logo更大 */
.testimonial-card:nth-child(1) .company-logo-img {
  width: 56px;
  height: 56px;
}

/* 分割线样式 */
.testimonial-card::after {
  content: '';
  position: absolute;
  top: 80px;
  left: 1.5rem;
  right: 1.5rem;
  height: 1px;
  background-color: #e0e0e0;
}

/* 人民日报 - 红色分割线 */
.testimonial-card:nth-child(1)::after {
  background-color: #e8a5a8;
  top: 80px;
}

/* 今日头条 - 橙红色分割线 */
.testimonial-card:nth-child(2)::after {
  background-color: #f4b3a8;
}

/* B站 - 粉色分割线 */
.testimonial-card:nth-child(3)::after {
  background-color: #f0b8d1;
}

/* 抖音 - 黑色分割线 */
.testimonial-card:nth-child(4)::after {
  background-color: #cccccc;
}

/* 快手 - 橙色分割线 */
.testimonial-card:nth-child(5)::after {
  background-color: #ffc4a3;
}

/* 小红书 - 红色分割线 */
.testimonial-card:nth-child(6)::after {
  background-color: #ffb3b3;
}

.testimonial-text {
  color: #333;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
  margin-top: 1.2rem;
  font-weight: 400;
  flex: 1;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  margin-top: auto;
}

.user-name {
  font-weight: 600;
  color: #2989d8;
  font-size: 0.85rem;
}

.user-title {
  color: #666;
  font-size: 0.75rem;
  font-weight: 400;
}

.scroll-indicators {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

.indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #ddd;
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator.active {
  background-color: #2989d8;
  transform: scale(1.2);
}

.indicator:hover {
  background-color: #2989d8;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .testimonials-grid {
    gap: 1rem;
    padding: 0.5rem 0;
  }

  .testimonial-card {
    min-width: 220px;
    max-width: 220px;
    padding: 1.3rem;
  }

  .company-logo-img {
    width: 42px;
    height: 42px;
  }

  /* 人民日报logo在移动端也更大 */
  .testimonial-card:nth-child(1) .company-logo-img {
    width: 48px;
    height: 48px;
  }

  /* 移动端分割线位置调整 */
  .testimonial-card::after {
    top: 70px;
    left: 1.3rem;
    right: 1.3rem;
  }

  .testimonial-card:nth-child(1)::after {
    top: 70px;
  }

  .testimonial-text {
    font-size: 0.85rem;
    margin-top: 1rem;
  }

  .user-name {
    font-size: 0.8rem;
  }

  .user-title {
    font-size: 0.7rem;
  }
}
</style>
