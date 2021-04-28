<template>
  <button
    :disabled="isDisabled"
    :class="[isResendButton ? 'resend-button' : 'confirm-button']"
    @click="$emit('click')"
  >
    {{ buttonText }}
  </button>
</template>

<script>
export default {
  name: 'SubmitButton',
  props: {
    buttonText: {
      type: String,
      required: true,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    remainingSeconds: {
      type: Number,
      required: false,
      default: 0,
    },
    isResendButton: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.confirm-button{
  width: 100%;
  height: 52px;
  margin-top: 12px;
  background:#353335;
  color: #fff;
  border-radius: 39px;
  font-size: 16px;
  font-weight: bold;
}
.resend-button {
 background:#00bce9;
 border: 1px solid #00bce9;
 font-size: 16px;
 width: 99px;
 height: 52px;
 margin-left: 10px;
 border-radius: 4px;
}
</style>
