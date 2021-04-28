<template>
  <div
    class="base-dialog__wrapper"
    :class="{ 'has-mask': isDialogOpen }"
    @click="handleOverlayClick"
  >
    <v-overlay :value="isDialogOpen" />
    <v-dialog
      attach
      :value="isDialogOpen"
      max-width="374"
      @click:outside="$emit('close')"
    >
      <v-card
        class="base-dialog__container"
        :style="{ padding: dialogPadding }"
      >
        <slot name="header" />
        <div
          class="dialog-content"
          :style="{ padding: contentPadding }"
        >
          <slot name="content" />
        </div>
        <div
          v-if="hasFooter"
          class="dialog-footer"
          :class="[confirmColor]"
        >
          <slot name="footer">
            <div
              v-t="'common.Confirm'"
              @click="$emit('close')"
            />
          </slot>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'BaseDialog',
  props: {
    dialogPadding: {
      type: String,
      default: '1.5rem 0 0.875rem',
    },
    contentPadding: {
      type: String,
      default: '0 2rem',
    },
    isDialogOpen: {
      type: Boolean,
      default: false,
    },
    confirmColor: {
      type: String,
      default: 'blue',
    },
    hasFooter: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    handleOverlayClick (event) {
      if (event.target.className.includes('overlay')) {
        this.$emit('close')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep .v-dialog {
  position: relative;
  border-radius: 12px;
  z-index: 1001 !important;
}

::v-deep .v-dialog__content {
  z-index: 1001 !important;
}

::v-deep .v-overlay {
  z-index: 203 !important;
  width: 100vw;
  height: 100vh;
  position: fixed;
}
.base-dialog__wrapper {
  .base-dialog__container {
  overflow-x: hidden;
  text-align: center;
  color: #010101;
  .dialog-content {
    display: flex;
    justify-content: center;
    flex-direction: column;
    min-height: 5rem;
  }
  .dialog-footer {
    height: 4.25rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #fff !important;
    cursor: pointer;
    & > :nth-last-child(1), & > :nth-last-child(2) {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &.blue > :nth-last-child(1) {
      color: #0285ff;
    }
    &.red > :nth-last-child(1) {
      color: #f72f47;
    }
    &.tealish > :nth-last-child(1) {
      color:  #1ebeae;
    }
    &.pink > :nth-last-child(1) {
      color:  #f86884;
    }
    &.black > :nth-last-child(1) {
      color: #010101;
    }
    &.grey > :nth-last-child(1) {
      color: #999;
    }
    &.green > :nth-last-child(1) {
      color:  #1ebeae;
    }
  }
}
}

</style>
