<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AboutPage',
})
</script>

<template>
  <div class="about-page">
    <div>
      <section class="banner">
        <div class="banner-content">
          <h1 class="animate__animated animate__fadeInDown">蒲公英乡野航迹实践队</h1>
          <p class="animate__animated animate__fadeInUp animate__delay-1s">心随风扬 奔赴希望</p>
        </div>
      </section>
    </div>
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
          <!-- 保持原有内容 -->
        </div>
        <div class="about-image">
          <img src="../assets/img/aboutBG.png" alt="团队合影" />
        </div>
      </div>
    </div>
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
}

.about-image img {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.5s ease;
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
</style>
