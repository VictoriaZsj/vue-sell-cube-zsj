<template>
  <div class="tab">
    <cube-tab-bar
       :useTransition=false
      :showSlider=true
      v-model="selectedLabel"
      :data="tabs"
      ref="tabBar"
      class="border-bottom-1px"
    >
    </cube-tab-bar>
    <div class="slide-wrapper">
      <cube-slide
        :loop=false
        :auto-play=false
        :show-dots=false
        :initial-index="index"
        ref="slide"
        :options="slideOptions"
        @scroll="onScroll"
        @change="onChange"
      >
        <cube-slide-item v-for="(tab,index) in tabs" :key="index">
          <component ref="tabComponents" :is="tab.component" :data="tab.data"></component>
        </cube-slide-item>
      </cube-slide>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'tab',
    components:{

    },
     props: {
      tabs: {
        type: Array,
        default() {
          return []
        }
      },
      initialIndex: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        index: this.initialIndex,
         slideOptions: {
          listenScroll: true,
          probeType: 3,
          directionLockThreshold: 0
        }
      }
    },
    computed: {
      //这里有点tab与底部内容双向绑定的感觉。因为tab组件点击选项的时候会设置selectedLabel，
      //而为了让底部滑动的时候也同步切换头部，则要用计算属性
      selectedLabel: {
        get() {
          console.log('999')
          return this.tabs[this.index].label
        },
        set(newValue){
            console.log('newValue:',newValue)
            this.index=this.tabs.findIndex((value)=>{
                return value.label===newValue
            })
        }
    
      }
    },
    watch:{
        selectedLabel(val){
            console.log('ww:',val)
        }
    },
    mounted() {
        this.onChange(this.index)
    },
    methods: {
      onChange(current){
           //访问子组件实例的方法
           this.index = current
            const instance = this.$refs.tabComponents[current]
            if (instance && instance.fetch) {
            instance.fetch()
            }
      },
      onScroll(pos){
           const tabBarWidth=this.$refs.tabBar.$el.clientWidth;
           const slideWidth = this.$refs.slide.slide.scrollerWidth;
            const transform = -pos.x / slideWidth * tabBarWidth
            this.$refs.tabBar.setSliderTransform(transform)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  .tab
    display: flex
    flex-direction: column
    height: 100%
    >>> .cube-tab
      padding: 10px 0
    .slide-wrapper
      flex: 1
      overflow: hidden
</style>
