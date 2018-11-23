<template>
  <div class="scroll">
    <swiper :options="swiperOption" ref="mySwiper"
            :style="{height: swiperOption.height + 'px'}">
      <swiper-slide class="slide">
        <img src="../assets/images/invite.png"
             :style="{height: swiperOption.height + 'px'}" alt="">
        <div class="guidance">
          <a class="guidance-btn" href="">
            <img src="../assets/images/down-android.png" alt="">
          </a>
          <a class="guidance-btn" href="">
            <img src="../assets/images/down-ios.png" alt="">
          </a>
          <a class="guidance-btn-big" href="">
            <img src="../assets/images/big-ans.png" alt="">
          </a>
        </div>
        <span class='arrow'></span>
      </swiper-slide>
      <swiper-slide class="slide">
        <img src="../assets/images/invite-major.png"
             :style="{height: swiperOption.height + 'px'}" alt="">
        <span class='arrow'></span>
      </swiper-slide>
      <swiper-slide class="slide">
        <img src="../assets/images/invite-experience.png"
             :style="{height: swiperOption.height + 'px'}" alt="">
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
  export default {
    name:'slide',
    data() {
      return {
        swiperOption: {
          direction: 'vertical',
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          slidesPerView: 1,
          mousewheel: true,
          height: window.innerHeight
        }
      }
    },
    mounted() {
    },
    methods: {}
  }
</script>
<style lang="less" scoped>
  .scroll {
    overflow: hidden ;
    overflow: hidden ;
  }

  .slide {
    width: 100%;
    position: relative;
    .guidance {
      position: absolute;
      bottom: 70px;
      left:0;
      right:0;
      border-radius: 5px;
      width: 80%;
      overflow: hidden;
      margin:auto;
      .guidance-btn {
        width: 50%;
        height: 50px;
      float:left;
      }
    }
    .arrow {
      position: absolute;
      bottom: 20px;
      left: 0;
      right: 0;
      width: 22px;
      height: 16px;
      margin: auto;
      background: url('../assets/images/animation-arrow.png') no-repeat center center;
      background-size: cover;
      display: block;
      vertical-align: middle;
      -webkit-animation: tipmove 1.5s infinite linear;
    }
    img {
      width: 100%;
    }
  }

  @-webkit-keyframes tipmove {
    0% {
      bottom: 10px;
    }
    50% {
      bottom: 15px;
    }
    100% {
      bottom: 20px;
    }
  }

</style>
