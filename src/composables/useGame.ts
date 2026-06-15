import { ref, computed } from 'vue'
import type { GameState, LogEntry, RandomEvent, ActionType, ActionEffect, Phase } from '@/types/game'
import { dayEvents, nightEvents, nightDecay } from '@/data/events'

const STORAGE_KEY_HIGH_SCORE = 'survival_game_high_score'
const MAX_STAT = 100

const actionEffects: Record<ActionType, ActionEffect> = {
  gatherWood: {
    health: -5, hunger: 5, thirst: 3, wood: 10, stone: 0 },
  gatherStone: {
    health: -8, hunger: 6, thirst: 4, wood: 0, stone: 8 },
  hunt: {
    health: 15, hunger: -20, thirst: 5, wood: -5, stone: 0 },
  drink: {
    health: 0, hunger: 2, thirst: -25, wood: -3, stone: 0 },
}

const actionNames: Record<ActionType, string> = {
  gatherWood: '采集木头',
  gatherStone: '采集石头',
  hunt: '打猎',
  drink: '喝水',
}

export function useGame() {
  const state = ref<GameState>({
    health: 80,
    hunger: 30,
    thirst: 30,
    wood: 10,
    stone: 5,
    turn: 1,
    phase: 'day',
    isGameOver: false,
    logs: [],
  })

  const highScore = ref<number>(0)
  let logIdCounter = 0

  const canAct = computed(() => !state.value.isGameOver && state.value.phase === 'day')
  const isDay = computed(() => state.value.phase === 'day')
  const isNight = computed(() => state.value.phase === 'night')

  function loadHighScore() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_HIGH_SCORE)
      if (saved) {
        highScore.value = parseInt(saved, 10) || 0
      }
    } catch (e) {
      highScore.value = 0
    }
  }

  function saveHighScore() {
    if (state.value.turn > highScore.value) {
      highScore.value = state.value.turn
      try {
        localStorage.setItem(STORAGE_KEY_HIGH_SCORE, String(highScore.value))
      } catch (e) {
        // ignore
      }
    }
  }

  function addLog(text: string, type: LogEntry['type'] = 'action') {
    state.value.logs.unshift({
      id: ++logIdCounter,
      text,
      type,
      turn: state.value.turn,
      phase: state.value.phase,
    })
    if (state.value.logs.length > 50) {
      state.value.logs.pop()
    }
  }

  function clampStat(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value))
  }

  function applyEffects(effects: ActionEffect) {
    if (effects.health !== undefined) {
      state.value.health = clampStat(state.value.health + effects.health, 0, MAX_STAT)
    }
    if (effects.hunger !== undefined) {
      state.value.hunger = clampStat(state.value.hunger + effects.hunger, 0, MAX_STAT)
    }
    if (effects.thirst !== undefined) {
      state.value.thirst = clampStat(state.value.thirst + effects.thirst, 0, MAX_STAT)
    }
    if (effects.wood !== undefined) {
      state.value.wood = Math.max(0, state.value.wood + effects.wood)
    }
    if (effects.stone !== undefined) {
      state.value.stone = Math.max(0, state.value.stone + effects.stone)
    }
  }

  function getDayEvent(): RandomEvent {
    const index = Math.floor(Math.random() * dayEvents.length)
    return dayEvents[index]
  }

  function getNightEvent(): RandomEvent {
    const index = Math.floor(Math.random() * nightEvents.length)
    return nightEvents[index]
  }

  function checkGameOver() {
    if (state.value.health <= 0 || state.value.hunger >= MAX_STAT || state.value.thirst >= MAX_STAT) {
      state.value.isGameOver = true
      saveHighScore()
      addLog('你没能在荒野中生存下来...', 'system')
    }
  }

  function canPerformAction(action: ActionType): boolean {
    if (state.value.isGameOver) return false
    if (state.value.phase !== 'day') return false
    const effects = actionEffects[action]
    if (effects.wood !== undefined && state.value.wood + effects.wood < 0) {
      return false
    }
    if (effects.stone !== undefined && state.value.stone + effects.stone < 0) {
      return false
    }
    return true
  }

  function resolveNight() {
    state.value.phase = 'night'

    addLog(`—— 夜幕降临，第 ${state.value.turn} 天结束 ——`, 'night')

    addLog(`夜间消耗：饥饿 +${nightDecay.hunger}，口渴 +${nightDecay.thirst}`, 'night')
    applyEffects({ hunger: nightDecay.hunger, thirst: nightDecay.thirst })

    const event = getNightEvent()
    applyEffects(event.effects)

    const eventLogType: LogEntry['type'] = event.type === 'good' ? 'good' : event.type === 'bad' ? 'bad' : 'night'
    addLog(`🌙 ${event.text}`, eventLogType)

    checkGameOver()

    if (!state.value.isGameOver) {
      state.value.turn++
      state.value.phase = 'day'
      addLog(`—— 第 ${state.value.turn} 天开始，天亮了 ——`, 'system')
    }
  }

  function performAction(action: ActionType) {
    if (!canPerformAction(action)) return

    const effects = actionEffects[action]
    applyEffects(effects)

    addLog(`☀️ ${actionNames[action]}`, 'action')

    const dayEvent = getDayEvent()
    applyEffects(dayEvent.effects)

    const eventLogType = dayEvent.type === 'good' ? 'good' : dayEvent.type === 'bad' ? 'bad' : 'event'
    addLog(dayEvent.text, eventLogType)

    checkGameOver()

    if (!state.value.isGameOver) {
      resolveNight()
    }
  }

  function gatherWood() {
    performAction('gatherWood')
  }

  function gatherStone() {
    performAction('gatherStone')
  }

  function hunt() {
    performAction('hunt')
  }

  function drink() {
    performAction('drink')
  }

  function restart() {
    state.value = {
      health: 80,
      hunger: 30,
      thirst: 30,
      wood: 10,
      stone: 5,
      turn: 1,
      phase: 'day',
      isGameOver: false,
      logs: [],
    }
    logIdCounter = 0
    addLog('你醒来发现自己身处荒野中，需要想办法生存下去...', 'system')
    addLog('—— 第 1 天开始，天亮了 ——', 'system')
  }

  loadHighScore()
  addLog('你醒来发现自己身处荒野中，需要想办法生存下去...', 'system')
  addLog('—— 第 1 天开始，天亮了 ——', 'system')

  return {
    state,
    highScore,
    canAct,
    isDay,
    isNight,
    canPerformAction,
    gatherWood,
    gatherStone,
    hunt,
    drink,
    restart,
  }
}
