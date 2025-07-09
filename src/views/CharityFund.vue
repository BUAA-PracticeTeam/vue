<template>
  <div class="charity-fund-page">
    <div class="container">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-icon">💝</div>
        <h1>爱心基金</h1>
        <p>蒲公英-乡野航迹实践队公益资金管理与展示平台</p>
      </div>

      <!-- 资金概览卡片 -->
      <div class="overview-cards">
        <div class="overview-card">
          <div class="card-icon">💰</div>
          <div class="card-content">
            <h3>总资金池</h3>
            <div class="amount">¥ 128,650</div>
            <div class="trend positive">+12.5%</div>
          </div>
        </div>
        <div class="overview-card">
          <div class="card-icon">🎓</div>
          <div class="card-content">
            <h3>支教投入</h3>
            <div class="amount">¥ 45,200</div>
            <div class="trend positive">+8.3%</div>
          </div>
        </div>
        <div class="overview-card">
          <div class="card-icon">📊</div>
          <div class="card-content">
            <h3>调研经费</h3>
            <div class="amount">¥ 32,800</div>
            <div class="trend positive">+15.2%</div>
          </div>
        </div>
        <div class="overview-card">
          <div class="card-icon">🎁</div>
          <div class="card-content">
            <h3>捐赠支出</h3>
            <div class="amount">¥ 28,450</div>
            <div class="trend positive">+6.7%</div>
          </div>
        </div>
      </div>

      <!-- 图表区域 -->
      <div class="charts-section">
        <!-- 资金流向桑基图 -->
        <div class="chart-container large">
          <div class="chart-header">
            <h2>资金流向分析</h2>
            <p>展示资金在不同项目间的流动情况</p>
          </div>
          <div ref="sankeyChart" class="chart"></div>
        </div>

        <!-- 收入支出对比 -->
        <div class="charts-row">
          <div class="chart-container">
            <div class="chart-header">
              <h3>月度收支趋势</h3>
            </div>
            <div ref="lineChart" class="chart"></div>
          </div>
          <div class="chart-container">
            <div class="chart-header">
              <h3>资金来源分布</h3>
            </div>
            <div ref="pieChart" class="chart"></div>
          </div>
        </div>

        <!-- 项目资金分配 -->
        <div class="charts-row">
          <div class="chart-container">
            <div class="chart-header">
              <h3>项目资金分配</h3>
            </div>
            <div ref="barChart" class="chart"></div>
          </div>
          <div class="chart-container">
            <div class="chart-header">
              <h3>中国地图 - 地区资金分布</h3>
            </div>
            <div ref="mapChart" class="chart"></div>
          </div>
        </div>

        <!-- 资金使用效率 -->
        <div class="charts-row">
          <div class="chart-container">
            <div class="chart-header">
              <h3>资金使用效率雷达图</h3>
            </div>
            <div ref="radarChart" class="chart"></div>
          </div>
          <div class="chart-container">
            <div class="chart-header">
              <h3>季度资金流向</h3>
            </div>
            <div ref="funnelChart" class="chart"></div>
          </div>
        </div>

        <!-- 时间轴资金流 -->
        <div class="chart-container large">
          <div class="chart-header">
            <h2>年度资金时间轴</h2>
            <p>展示全年资金流动的时间分布</p>
          </div>
          <div ref="timelineChart" class="chart"></div>
        </div>
      </div>

      <!-- 详细数据表格 -->
      <div class="data-section">
        <div class="section-header">
          <h2>资金明细记录</h2>
          <div class="filter-controls">
            <select v-model="selectedYear" @change="updateTableData">
              <option value="2024">2024年</option>
              <option value="2023">2023年</option>
              <option value="2022">2022年</option>
            </select>
            <select v-model="selectedType" @change="updateTableData">
              <option value="all">全部类型</option>
              <option value="income">收入</option>
              <option value="expense">支出</option>
            </select>
          </div>
        </div>
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>日期</th>
                <th>项目</th>
                <th>类型</th>
                <th>金额</th>
                <th>描述</th>
                <th>状态</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in tableData" :key="item.id">
                <td>{{ item.date }}</td>
                <td>{{ item.project }}</td>
                <td>
                  <span :class="['type-badge', item.type]">
                    {{ item.type === 'income' ? '收入' : '支出' }}
                  </span>
                </td>
                <td :class="['amount', item.type]">
                  {{ item.type === 'income' ? '+' : '-' }}¥{{ item.amount.toLocaleString() }}
                </td>
                <td>{{ item.description }}</td>
                <td>
                  <span :class="['status-badge', item.status]">
                    {{ item.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import chinaJson from '@/assets/china.json'

// 定义组件名称
defineOptions({
  name: 'CharityFundPage',
})

// 响应式数据
const selectedYear = ref('2024')
const selectedType = ref('all')

// 图表引用
const sankeyChart = ref(null)
const lineChart = ref(null)
const pieChart = ref(null)
const barChart = ref(null)
const mapChart = ref(null)
const radarChart = ref(null)
const funnelChart = ref(null)
const timelineChart = ref(null)

// 表格数据
const tableData = ref([
  {
    id: 1,
    date: '2024-01-15',
    project: '春季支教',
    type: 'expense',
    amount: 8500,
    description: '购买教学用品和教材',
    status: '已完成',
  },
  {
    id: 2,
    date: '2024-01-20',
    project: '社会捐赠',
    type: 'income',
    amount: 15000,
    description: '企业爱心捐赠',
    status: '已完成',
  },
  {
    id: 3,
    date: '2024-02-10',
    project: '调研活动',
    type: 'expense',
    amount: 3200,
    description: '调研差旅费用',
    status: '已完成',
  },
  {
    id: 4,
    date: '2024-02-25',
    project: '物资捐赠',
    type: 'expense',
    amount: 6800,
    description: '购买学习用品捐赠',
    status: '进行中',
  },
  {
    id: 5,
    date: '2024-03-05',
    project: '校友捐赠',
    type: 'income',
    amount: 8000,
    description: '校友会捐赠',
    status: '已完成',
  },
])

// 更新表格数据
const updateTableData = () => {
  // 这里可以根据筛选条件更新数据
  console.log('更新表格数据:', selectedYear.value, selectedType.value)
}

// 在 initCharts 和所有 initXxxChart 函数中，将 echarts 相关用法改为动态 import
let echartsInstance = null

// 初始化桑基图
const initSankeyChart = async () => {
  if (!echartsInstance) echartsInstance = await import('echarts')
  const chart = echartsInstance.init(sankeyChart.value)
  const option = {
    title: {
      text: '资金流向网络图',
      left: 'center',
      textStyle: {
        color: '#2c3e50',
        fontSize: 16,
      },
    },
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove',
    },
    series: [
      {
        type: 'sankey',
        layout: 'none',
        data: [
          { name: '社会捐赠' },
          { name: '企业赞助' },
          { name: '校友捐赠' },
          { name: '政府资助' },
          { name: '支教项目' },
          { name: '调研活动' },
          { name: '物资捐赠' },
          { name: '设备采购' },
          { name: '培训费用' },
        ],
        links: [
          { source: '社会捐赠', target: '支教项目', value: 15 },
          { source: '社会捐赠', target: '物资捐赠', value: 8 },
          { source: '企业赞助', target: '调研活动', value: 12 },
          { source: '企业赞助', target: '设备采购', value: 6 },
          { source: '校友捐赠', target: '支教项目', value: 8 },
          { source: '校友捐赠', target: '培训费用', value: 4 },
          { source: '政府资助', target: '调研活动', value: 10 },
          { source: '政府资助', target: '物资捐赠', value: 5 },
        ],
        emphasis: {
          focus: 'adjacency',
        },
        lineStyle: {
          color: 'source',
          curveness: 0.5,
        },
        label: {
          position: 'right',
        },
      },
    ],
  }
  chart.setOption(option)
}

// 初始化折线图
const initLineChart = async () => {
  if (!echartsInstance) echartsInstance = await import('echarts')
  const chart = echartsInstance.init(lineChart.value)
  const option = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['收入', '支出', '结余'],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '收入',
        type: 'line',
        stack: 'Total',
        data: [12000, 15000, 8000, 18000, 22000, 16000, 14000, 19000, 25000, 21000, 18000, 22000],
        smooth: true,
        lineStyle: {
          color: '#67C23A',
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(103, 194, 58, 0.3)',
              },
              {
                offset: 1,
                color: 'rgba(103, 194, 58, 0.1)',
              },
            ],
          },
        },
      },
      {
        name: '支出',
        type: 'line',
        stack: 'Total',
        data: [8500, 12000, 6800, 15000, 18000, 14000, 12000, 16000, 20000, 17000, 15000, 18000],
        smooth: true,
        lineStyle: {
          color: '#F56C6C',
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(245, 108, 108, 0.3)',
              },
              {
                offset: 1,
                color: 'rgba(245, 108, 108, 0.1)',
              },
            ],
          },
        },
      },
      {
        name: '结余',
        type: 'line',
        stack: 'Total',
        data: [3500, 3000, 1200, 3000, 4000, 2000, 2000, 3000, 5000, 4000, 3000, 4000],
        smooth: true,
        lineStyle: {
          color: '#409EFF',
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(64, 158, 255, 0.3)',
              },
              {
                offset: 1,
                color: 'rgba(64, 158, 255, 0.1)',
              },
            ],
          },
        },
      },
    ],
  }
  chart.setOption(option)
}

// 初始化饼图
const initPieChart = async () => {
  if (!echartsInstance) echartsInstance = await import('echarts')
  const chart = echartsInstance.init(pieChart.value)
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: '资金来源',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '30',
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 35, name: '社会捐赠', itemStyle: { color: '#67C23A' } },
          { value: 25, name: '企业赞助', itemStyle: { color: '#409EFF' } },
          { value: 20, name: '校友捐赠', itemStyle: { color: '#E6A23C' } },
          { value: 15, name: '政府资助', itemStyle: { color: '#F56C6C' } },
          { value: 5, name: '其他', itemStyle: { color: '#909399' } },
        ],
      },
    ],
  }
  chart.setOption(option)
}

// 初始化柱状图
const initBarChart = async () => {
  if (!echartsInstance) echartsInstance = await import('echarts')
  const chart = echartsInstance.init(barChart.value)
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    legend: {
      data: ['预算', '实际支出'],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: ['支教项目', '调研活动', '物资捐赠', '设备采购', '培训费用', '其他'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '预算',
        type: 'bar',
        data: [50000, 35000, 25000, 15000, 10000, 5000],
        itemStyle: {
          color: '#409EFF',
        },
      },
      {
        name: '实际支出',
        type: 'bar',
        data: [45200, 32800, 28450, 12000, 8500, 3700],
        itemStyle: {
          color: '#67C23A',
        },
      },
    ],
  }
  chart.setOption(option)
}

// 初始化中国地图
const initMapChart = async () => {
  if (!echartsInstance) echartsInstance = await import('echarts')
  // 注册中国地图
  echartsInstance.registerMap('china', chinaJson)

  const chart = echartsInstance.init(mapChart.value)
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}<br/>资金投入: {c}万元',
    },
    visualMap: {
      min: 0,
      max: 50,
      left: 'left',
      top: 'bottom',
      text: ['高', '低'],
      calculable: true,
      inRange: {
        color: [
          '#fff7e6',
          '#ffd591',
          '#ffb366',
          '#ff8c1a',
          '#ff6600',
          '#cc5200',
          '#993d00',
          '#662900',
        ],
      },
    },
    series: [
      {
        name: '资金分布',
        type: 'map',
        map: 'china',
        roam: true,
        emphasis: {
          label: {
            show: true,
            color: '#fff',
          },
          itemStyle: {
            areaColor: '#ffcc00',
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
        itemStyle: {
          borderColor: '#0288d1',
          borderWidth: 1,
        },
        data: [
          { name: '北京', value: 45 },
          { name: '上海', value: 38 },
          { name: '广东', value: 32 },
          { name: '四川', value: 28 },
          { name: '云南', value: 25 },
          { name: '贵州', value: 22 },
          { name: '甘肃', value: 18 },
          { name: '青海', value: 15 },
          { name: '陕西', value: 20 },
          { name: '河南', value: 16 },
          { name: '湖北', value: 14 },
          { name: '湖南', value: 12 },
          { name: '江西', value: 10 },
          { name: '安徽', value: 8 },
          { name: '江苏', value: 30 },
          { name: '浙江', value: 26 },
          { name: '福建', value: 18 },
          { name: '山东', value: 22 },
          { name: '河北', value: 15 },
          { name: '山西', value: 12 },
          { name: '内蒙古', value: 8 },
          { name: '辽宁', value: 16 },
          { name: '吉林', value: 10 },
          { name: '黑龙江', value: 8 },
          { name: '新疆', value: 6 },
          { name: '西藏', value: 4 },
          { name: '宁夏', value: 5 },
          { name: '海南', value: 8 },
          { name: '台湾', value: 12 },
          { name: '香港', value: 20 },
          { name: '澳门', value: 8 },
        ],
      },
    ],
  }
  chart.setOption(option)
}

// 初始化雷达图
const initRadarChart = async () => {
  if (!echartsInstance) echartsInstance = await import('echarts')
  const chart = echartsInstance.init(radarChart.value)
  const option = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      data: ['当前表现', '目标值'],
    },
    radar: {
      indicator: [
        { name: '资金使用效率', max: 100 },
        { name: '项目完成度', max: 100 },
        { name: '受益人数', max: 100 },
        { name: '社会影响力', max: 100 },
        { name: '透明度', max: 100 },
        { name: '可持续性', max: 100 },
      ],
      radius: '65%',
      center: ['50%', '50%'],
    },
    series: [
      {
        name: '效率指标',
        type: 'radar',
        data: [
          {
            value: [85, 90, 75, 80, 95, 70],
            name: '当前表现',
            itemStyle: {
              color: '#409EFF',
            },
            areaStyle: {
              color: 'rgba(64, 158, 255, 0.3)',
            },
          },
          {
            value: [95, 95, 90, 90, 100, 85],
            name: '目标值',
            itemStyle: {
              color: '#67C23A',
            },
            areaStyle: {
              color: 'rgba(103, 194, 58, 0.2)',
            },
          },
        ],
      },
    ],
  }
  chart.setOption(option)
}

// 初始化漏斗图
const initFunnelChart = async () => {
  if (!echartsInstance) echartsInstance = await import('echarts')
  const chart = echartsInstance.init(funnelChart.value)
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c}%',
    },
    series: [
      {
        name: '资金流向',
        type: 'funnel',
        left: '10%',
        top: 60,
        width: '80%',
        height: '80%',
        min: 0,
        max: 100,
        minSize: '0%',
        maxSize: '100%',
        sort: 'descending',
        gap: 2,
        label: {
          show: true,
          position: 'inside',
        },
        labelLine: {
          length: 10,
          lineStyle: {
            width: 1,
            type: 'solid',
          },
        },
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 1,
        },
        emphasis: {
          label: {
            fontSize: 20,
          },
        },
        data: [
          { value: 100, name: '总资金' },
          { value: 80, name: '项目执行' },
          { value: 60, name: '直接受益' },
          { value: 40, name: '间接影响' },
          { value: 20, name: '长期效益' },
        ],
      },
    ],
  }
  chart.setOption(option)
}

// 初始化时间轴图
const initTimelineChart = async () => {
  if (!echartsInstance) echartsInstance = await import('echarts')
  const chart = echartsInstance.init(timelineChart.value)
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
    },
    legend: {
      data: ['收入', '支出'],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: [
          '1月',
          '2月',
          '3月',
          '4月',
          '5月',
          '6月',
          '7月',
          '8月',
          '9月',
          '10月',
          '11月',
          '12月',
        ],
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: '收入',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          color: '#67C23A',
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(103, 194, 58, 0.3)',
              },
              {
                offset: 1,
                color: 'rgba(103, 194, 58, 0.1)',
              },
            ],
          },
        },
        emphasis: {
          focus: 'series',
        },
        data: [12000, 15000, 8000, 18000, 22000, 16000, 14000, 19000, 25000, 21000, 18000, 22000],
      },
      {
        name: '支出',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          color: '#F56C6C',
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(245, 108, 108, 0.3)',
              },
              {
                offset: 1,
                color: 'rgba(245, 108, 108, 0.1)',
              },
            ],
          },
        },
        emphasis: {
          focus: 'series',
        },
        data: [8500, 12000, 6800, 15000, 18000, 14000, 12000, 16000, 20000, 17000, 15000, 18000],
      },
    ],
  }
  chart.setOption(option)
}

// 初始化所有图表
const initCharts = async () => {
  await nextTick()

  // 初始化各个图表
  await initSankeyChart()
  await initLineChart()
  await initPieChart()
  await initBarChart()
  await initMapChart()
  await initRadarChart()
  await initFunnelChart()
  await initTimelineChart()

  // 监听窗口大小变化
  window.addEventListener('resize', async () => {
    if (!echartsInstance) echartsInstance = await import('echarts')
    const charts = [
      echartsInstance.getInstanceByDom(sankeyChart.value),
      echartsInstance.getInstanceByDom(lineChart.value),
      echartsInstance.getInstanceByDom(pieChart.value),
      echartsInstance.getInstanceByDom(barChart.value),
      echartsInstance.getInstanceByDom(mapChart.value),
      echartsInstance.getInstanceByDom(radarChart.value),
      echartsInstance.getInstanceByDom(funnelChart.value),
      echartsInstance.getInstanceByDom(timelineChart.value),
    ]

    charts.forEach((chart) => {
      if (chart) {
        chart.resize()
      }
    })
  })
}

onMounted(() => {
  initCharts()
})
</script>

<style scoped>
.charity-fund-page {
  padding-top: 120px;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
}

.charity-fund-page::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  opacity: 0.3;
  pointer-events: none;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;
}

/* 页面头部 */
.page-header {
  text-align: center;
  margin-bottom: 40px;
  padding: 60px 0;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.header-icon {
  font-size: 4rem;
  margin-bottom: 20px;
  animation: float 3s ease-in-out infinite;
}

.page-header h1 {
  font-size: 3rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 15px;
  font-weight: 800;
  letter-spacing: -1px;
}

.page-header p {
  font-size: 1.3rem;
  color: #6c757d;
  margin: 0;
  font-weight: 500;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* 概览卡片 */
.overview-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.overview-card {
  background: rgba(255, 255, 255, 0.95);
  padding: 30px;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 20px;
  transition: all 0.3s ease;
}

.overview-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.card-icon {
  font-size: 3rem;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  color: white;
}

.card-content h3 {
  color: #6c757d;
  font-size: 1rem;
  margin-bottom: 8px;
  font-weight: 600;
}

.amount {
  font-size: 1.8rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 5px;
}

.trend {
  font-size: 0.9rem;
  font-weight: 600;
}

.trend.positive {
  color: #67c23a;
}

/* 图表区域 */
.charts-section {
  margin-bottom: 40px;
}

.charts-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.chart-container {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 25px;
  backdrop-filter: blur(10px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.chart-container:hover {
  transform: translateY(-3px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.chart-container.large {
  grid-column: 1 / -1;
}

.chart-header {
  margin-bottom: 20px;
  text-align: center;
}

.chart-header h2 {
  color: #2c3e50;
  font-size: 1.5rem;
  margin-bottom: 5px;
  font-weight: 700;
}

.chart-header h3 {
  color: #2c3e50;
  font-size: 1.3rem;
  margin-bottom: 5px;
  font-weight: 700;
}

.chart-header p {
  color: #6c757d;
  font-size: 0.9rem;
  margin: 0;
}

.chart {
  height: 400px;
  width: 100%;
}

.chart-container.large .chart {
  height: 500px;
}

/* 数据表格 */
.data-section {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 30px;
  backdrop-filter: blur(10px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  flex-wrap: wrap;
  gap: 15px;
}

.section-header h2 {
  color: #2c3e50;
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0;
}

.filter-controls {
  display: flex;
  gap: 15px;
}

.filter-controls select {
  padding: 8px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  color: #2c3e50;
  font-size: 0.9rem;
  cursor: pointer;
}

.table-container {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.data-table th,
.data-table td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.data-table th {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
}

.data-table tr:hover {
  background: rgba(102, 126, 234, 0.05);
}

.type-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
}

.type-badge.income {
  background: rgba(103, 194, 58, 0.1);
  color: #67c23a;
}

.type-badge.expense {
  background: rgba(245, 108, 108, 0.1);
  color: #f56c6c;
}

.amount.income {
  color: #67c23a;
  font-weight: 600;
}

.amount.expense {
  color: #f56c6c;
  font-weight: 600;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
}

.status-badge.已完成 {
  background: rgba(103, 194, 58, 0.1);
  color: #67c23a;
}

.status-badge.进行中 {
  background: rgba(230, 162, 60, 0.1);
  color: #e6a23c;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .container {
    padding: 0 15px;
  }

  .page-header {
    padding: 40px 20px;
  }

  .page-header h1 {
    font-size: 2rem;
  }

  .page-header p {
    font-size: 1rem;
  }

  .overview-cards {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .overview-card {
    padding: 20px;
  }

  .card-icon {
    width: 60px;
    height: 60px;
    font-size: 2rem;
  }

  .amount {
    font-size: 1.5rem;
  }

  .charts-row {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .chart-container {
    padding: 20px;
  }

  .chart {
    height: 300px;
  }

  .chart-container.large .chart {
    height: 400px;
  }

  .section-header {
    flex-direction: column;
    align-items: stretch;
  }

  .filter-controls {
    justify-content: center;
  }

  .data-table {
    font-size: 0.9rem;
  }

  .data-table th,
  .data-table td {
    padding: 10px;
  }
}

@media (max-width: 480px) {
  .page-header h1 {
    font-size: 1.8rem;
  }

  .overview-card {
    flex-direction: column;
    text-align: center;
  }

  .chart {
    height: 250px;
  }

  .chart-container.large .chart {
    height: 350px;
  }
}
</style>
