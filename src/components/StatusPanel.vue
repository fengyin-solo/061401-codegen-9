<script setup lang="ts">
import type { Phase } from '@/types/game'
import { computed } from 'vue'

interface StatItem {
  label: string
  value: number
  max: number
  icon: string
  color: string
  barColor: string
  isReverse?: boolean
}

interface Props {
  health: number
  hunger: number
  thirst: number
  wood: number
  stone: number
  phase: Phase
}

const props = defineProps<Props>()

const phaseIcon = computed(() => props.phase === 'day' ? '☀️' : '🌙')
const phaseLabel = computed(() => props.phase === 'day' ? '白天' : '夜晚')
const phaseClass = computed(() => props.phase === 'day' ? 'text-yellow-400' : 'text-indigo-400')
const phaseBorderClass = computed(() => props.phase === 'day' ? 'border-yellow-500/30' : 'border-indigo-500/30')
const phaseBgClass = computed(() => props.phase === 'day' ? 'bg-yellow-500/10' : 'bg-indigo-500/10')
const cardBorderClass = computed(() => props.phase === 'day' ? 'border-yellow-500/20' : 'border-indigo-500/20')
const cardGlowClass = computed(() => props.phase === 'day' ? 'shadow-yellow-500/5' : 'shadow-indigo-500/10')

const stats = computed<StatItem[]>(() => [
  {
    label: '生命值',
    value: props.health,
    max: 100,
    icon: '❤️',
    color: 'text-red-400',
    barColor: 'bg-red-500',
  },
  {
    label: '饥饿值',
    value: props.hunger,
    max: 100,
    icon: '🍖',
    color: 'text-orange-400',
    barColor: 'bg-orange-500',
    isReverse: true,
  },
  {
    label: '口渴值',
    value: props.thirst,
    max: 100,
    icon: '💧',
    color: 'text-blue-400',
    barColor: 'bg-blue-500',
    isReverse: true,
  },
  {
    label: '木材',
    value: props.wood,
    max: 100,
    icon: '🪵',
    color: 'text-amber-600',
    barColor: 'bg-amber-600',
  },
  {
    label: '石头',
    value: props.stone,
    max: 100,
    icon: '🪨',
    color: 'text-gray-400',
    barColor: 'bg-gray-400',
  },
])

function getBarWidth(value: number, max: number): string {
  const percent = Math.max(0, Math.min(100, (value / max) * 100))
  return `${percent}%`
}

function isDanger(value: number, max: number, isReverse?: boolean): boolean {
  const percent = (value / max) * 100
  if (isReverse) {
    return percent >= 80
  }
  return percent <= 20
}
</script>

<template>
  <div :class="['bg-game-card rounded-2xl p-6 border shadow-xl transition-all duration-500', cardBorderClass, cardGlowClass]">
    <div class="flex items-center justify-between mb-5">
      <h2 class="text-xl font-bold text-white flex items-center gap-2">
        <span>📊</span>
        <span>生存状态</span>
      </h2>
      <div
        :class="[phaseBgClass, phaseBorderClass, 'flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all duration-300']"
      >
        <span class="text-base">{{ phaseIcon }}</span>
        <span :class="[phaseClass, 'font-bold text-sm']">{{ phaseLabel }}</span>
      </div>
    </div>
    <div class="space-y-4">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="group"
      >
        <div class="flex items-center justify-between mb-1.5">
          <div class="flex items-center gap-2">
            <span class="text-lg">{{ stat.icon }}</span>
            <span :class="[stat.color, 'font-medium text-sm']">{{ stat.label }}</span>
          </div>
          <span
            :class="[
              stat.color,
              'font-bold text-sm tabular-nums',
              isDanger(stat.value, stat.max, stat.isReverse) ? 'animate-pulse-soft' : '',
            ]"
          >
            {{ Math.round(stat.value) }}
          </span>
        </div>
        <div class="h-2.5 bg-gray-800 rounded-full overflow-hidden">
          <div
            :class="[stat.barColor, 'h-full rounded-full transition-all duration-300 ease-out']"
            :style="{ width: getBarWidth(stat.value, stat.max) }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
