<script setup lang="ts">
import type { Phase } from '@/types/game'
import { computed } from 'vue'

interface ActionButton {
  label: string
  icon: string
  description: string
  action: () => void
  disabled: boolean
  bgClass: string
  hoverClass: string
}

interface Props {
  canGatherWood: boolean
  canGatherStone: boolean
  canHunt: boolean
  canDrink: boolean
  disabled: boolean
  phase: Phase
}

const props = defineProps<Props>()

const emit = defineEmits<{
  gatherWood: []
  gatherStone: []
  hunt: []
  drink: []
}>()

const isNightPhase = computed(() => props.phase === 'night')

const nightNotice = computed(() => isNightPhase.value && !props.disabled)

const buttons: ActionButton[] = [
  {
    label: '采集木头',
    icon: '🪵',
    description: '获得木材，消耗体力',
    action: () => emit('gatherWood'),
    disabled: false,
    bgClass: 'bg-amber-900/40',
    hoverClass: 'hover:bg-amber-800/60',
  },
  {
    label: '采集石头',
    icon: '🪨',
    description: '获得石头，消耗体力',
    action: () => emit('gatherStone'),
    disabled: false,
    bgClass: 'bg-gray-700/40',
    hoverClass: 'hover:bg-gray-600/60',
  },
  {
    label: '打猎',
    icon: '🏹',
    description: '回复生命，增加饥饿，消耗木材',
    action: () => emit('hunt'),
    disabled: false,
    bgClass: 'bg-red-900/40',
    hoverClass: 'hover:bg-red-800/60',
  },
  {
    label: '喝水',
    icon: '💧',
    description: '减少口渴，消耗木材烧水',
    action: () => emit('drink'),
    disabled: false,
    bgClass: 'bg-blue-900/40',
    hoverClass: 'hover:bg-blue-800/60',
  },
]
</script>

<template>
  <div class="bg-game-card rounded-2xl p-6 border border-game-border shadow-xl">
    <h2 class="text-xl font-bold text-white mb-5 flex items-center gap-2">
      <span>⚡</span>
      <span>行动</span>
    </h2>
    <div v-if="nightNotice" class="mb-4 p-3 rounded-xl bg-indigo-900/30 border border-indigo-500/30 text-center">
      <span class="text-indigo-400 text-sm font-medium">🌙 夜晚已至，等待天亮...</span>
    </div>
    <div class="grid grid-cols-2 gap-3" :class="{ 'opacity-50 pointer-events-none': isNightPhase }">
      <button
        v-for="(btn, index) in buttons"
        :key="btn.label"
        @click="btn.action"
        :disabled="disabled || isNightPhase || (index === 0 ? !canGatherWood : index === 1 ? !canGatherStone : index === 2 ? !canHunt : !canDrink)"
        :class="[
          btn.bgClass,
          'relative p-4 rounded-xl border border-game-border transition-all duration-200',
          'flex flex-col items-center justify-center gap-2 text-center',
          disabled || isNightPhase || (index === 0 ? !canGatherWood : index === 1 ? !canGatherStone : index === 2 ? !canHunt : !canDrink)
            ? 'opacity-40 cursor-not-allowed'
            : [btn.hoverClass, 'hover:scale-[1.02] hover:shadow-lg cursor-pointer active:scale-[0.98]'],
        ]"
      >
        <span class="text-3xl">{{ btn.icon }}</span>
        <span class="text-white font-semibold text-sm">{{ btn.label }}</span>
        <span class="text-gray-400 text-xs">{{ btn.description }}</span>
      </button>
    </div>
  </div>
</template>
