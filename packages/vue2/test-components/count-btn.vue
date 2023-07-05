<template>
  <div>
    <span data-test="globalData" v-if="globalData">{{ globalData }}:</span>
    <button class="count-btn" :disabled="disabled" @click="sub">-</button>
    <span data-test="count" style="padding: 0 10px">{{ count }}</span>
    <button class="count-btn" :disabled="disabled" @click="add">+</button>
  </div>
</template>

<script>
export default {
  name: 'CountBtn',
  inheritAttrs: false,
  inject: {
    globalData: {
      from: 'globalData',
      default() {
        return ''
      }
    }
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    defaultValue: {
      type: String,
      default: ''
    },
    updateValue: {
      type: Function,
      default() {}
    }
  },
  data() {
    return {
      count: parseInt(this.defaultValue)
    }
  },
  watch: {
    count(count) {
      if (typeof this.updateValue === 'function') {
        this.updateValue(count + '')
      }
    }
  },
  methods: {
    sub() {
      this.count -= 1
    },
    add() {
      this.count += 1
    }
  }
}
</script>

<style>
.count-btn {
  width: 25px;
}
</style>