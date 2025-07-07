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
    let typewriterInterval = null
    let isDeleting = false
    let currentIndex = 0

    const handleToggleChat = (open) => {
      isChatOpen.value = open
    }

    const handleCloseChat = () => {
      isChatOpen.value = false
    }

    const startTypewriter = () => {
      typewriterInterval = setInterval(() => {
        if (!isDeleting) {
          // 打字阶段
          if (currentIndex < fullText.length) {
            typewriterText.value = fullText.slice(0, currentIndex + 1)
            currentIndex++
          } else {
            // 等待一段时间后开始删除
            setTimeout(() => {
              isDeleting = true
            }, 2000)
          }
        } else {
          // 删除阶段
          if (currentIndex > 0) {
            typewriterText.value = fullText.slice(0, currentIndex - 1)
            currentIndex--
          } else {
            // 删除完成后重新开始
            isDeleting = false
            setTimeout(() => {
              currentIndex = 0
            }, 1000)
          }
        }
      }, 150) // 打字速度
    }

    onMounted(() => {
      // 启动打字机效果
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
    })

    onUnmounted(() => {
      if (typewriterInterval) {
        clearInterval(typewriterInterval)
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
    }
  },
})
</script>

<template>
  <div class="about-page">
    <div>
      <section class="banner">
        <div class="banner-content">
          <h1 class="animate__animated animate__fadeInDown">蒲公英-乡野航迹实践队</h1>
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
            蒲公英-乡野航迹实践队成立于2023年，是一支由北京航空航天大学计算机学院自发组织的志愿服务团队。我们致力于社会调研、乡村支教、环境保护等公益实践活动，旨在通过实际行动服务社会、锻炼自我。
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
</style>
