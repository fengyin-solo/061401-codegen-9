<script setup lang="ts">
import { computed } from 'vue'
import StatusPanel from '@/components/StatusPanel.vue'
import ActionButtons from '@/components/ActionButtons.vue'
import EventLog from '@/components/EventLog.vue'
import GameOverModal from '@/components/GameOverModal.vue'
import { useGame } from '@/composables/useGame'

const { state, highScore, canPerformAction, isDay, isNight, gatherWood, gatherStone, hunt, drink, advanceDay, restart } = useGame()

const isNewRecord = computed(() => state.value.turn >= highScore.value && state.value.turn > 0)

const phaseLabel = computed(() => isDay.value ? '白天' : '夜晚')
const phaseIcon = computed(() => isDay.value ? '☀️' : '🌙')
const phaseColorClass = computed(() => isDay.value ? 'text-yellow-400' : 'text-indigo-400')
const phaseBgClass = computed(() => isDay.value ? 'bg-yellow-500/10' : 'bg-indigo-500/10')
const phaseBorderClass = computed(() => isDay.value ? 'border-yellow-500/30' : 'border-indigo-500/30')
</script>

<template>
  <div class="min-h-screen bg-game-bg text-white">
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-green-900/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl"></div>
    </div>

    <div class="relative z-10 max-w-6xl mx-auto px-4 py-8">
      <header class="text-center mb-8">
        <h1 class="text-4xl font-bold mb-2 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
          🏕️ 荒野生存
        </h1>
        <p class="text-gray-400">在恶劣的荒野中尽可能生存更久</p>
      </header>

      <div class="flex justify-center gap-8 mb-8">
        <div class="bg-game-card/80 backdrop-blur px-6 py-3 rounded-xl border border-game-border">
          <span class="text-gray-400 text-sm">当前天数</span>
          <p class="text-2xl font-bold text-white tabular-nums">第 {{ state.turn }} 天</p>
        </div>
        <div
          :class="[phaseBgClass, phaseBorderClass, 'backdrop-blur px-6 py-3 rounded-xl border transition-all duration-300']"
        >
          <span class="text-gray-400 text-sm">当前阶段</span>
          <p class="text-2xl font-bold tabular-nums flex items-center gap-2">
            <span>{{ phaseIcon }}</span>
            <span :class="phaseColorClass">{{ phaseLabel }}</span>
          </p>
        </div>
        <div class="bg-game-card/80 backdrop-blur px-6 py-3 rounded-xl border border-game-border">
          <span class="text-gray-400 text-sm">最高纪录</span>
          <p class="text-2xl font-bold text-yellow-400 tabular-nums">🏆 {{ highScore }}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="space-y-6">
          <StatusPanel
            :health="state.health"
            :hunger="state.hunger"
            :thirst="state.thirst"
            :wood="state.wood"
            :stone="state.stone"
            :phase="state.phase"
          />
        </div>

        <div>
          <ActionButtons
            :can-gather-wood="canPerformAction('gatherWood')"
            :can-gather-stone="canPerformAction('gatherStone')"
            :can-hunt="canPerformAction('hunt')"
            :can-drink="canPerformAction('drink')"
            :disabled="state.isGameOver"
            :phase="state.phase"
            @gather-wood="gatherWood"
            @gather-stone="gatherStone"
            @hunt="hunt"
            @drink="drink"
            @advance-day="advanceDay"
          />
        </div>

        <div>
          <EventLog :logs="state.logs" />
        </div>
      </div>

      <footer class="mt-8 text-center text-gray-500 text-sm">
        <p>💡 提示：每个白天行动后自动进入夜晚结算，夜间会有额外消耗和事件</p>
      </footer>
    </div>

    <GameOverModal
      :show="state.isGameOver"
      :final-turn="state.turn"
      :high-score="highScore"
      :is-new-record="isNewRecord"
      :final-phase="state.phase"
      @restart="restart"
    />
  </div>
</template>
