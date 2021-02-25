<template>
  <div id="equipment">
    <device-list/>
  </div>
</template>

<script>
import DeviceList from '@/views/device/list/index'

export default {
  name: 'Device',
  components: {
    DeviceList
  }
}
</script>

<style lang="scss" scoped>

</style>
