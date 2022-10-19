<script setup lang="ts">
import { useLoading } from "@/hooks/useLoading";
import { useConfirmModal } from "@/hooks/useConfirmModal";
import GModalConfirm from "@/components/base/GConfirmModal.vue";
const { isLoading } = useLoading();
const { confirmModalVisible, confirmModalConfig } = useConfirmModal();
</script>
<template>
  <a-spin :spinning="false" :delay="200">
    <router-view />
  </a-spin>
  <GModalConfirm
    v-model:visible="confirmModalVisible"
    :confirmModalConfig="confirmModalConfig"
  />
</template>

<style lang="scss">
.ant-input {
  &:not(.ant-input-password input) {
    border-radius: 12px !important;
  }
}

.ant-input-password {
  border-radius: 12px !important;
}

.ant-spin-dot {
  top: 120% !important;
}
</style>
