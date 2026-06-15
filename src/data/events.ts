import type { RandomEvent } from '@/types/game'

export const dayEvents: RandomEvent[] = [
  {
    id: 'find_berries',
    text: '你发现了一丛野生浆果！',
    type: 'good',
    effects: { hunger: -12 },
  },
  {
    id: 'find_spring',
    text: '你找到了一处清澈的泉水！',
    type: 'good',
    effects: { thirst: -18 },
  },
  {
    id: 'cold_weather',
    text: '天气突然变冷，你消耗了更多体力和木材取暖。',
    type: 'bad',
    effects: { health: -5, wood: -4 },
  },
  {
    id: 'abandoned_camp',
    text: '你发现了一个废弃的营地，找到了一些物资！',
    type: 'good',
    effects: { wood: 8, stone: 5 },
  },
  {
    id: 'trap',
    text: '你不小心踩到了一个陷阱！',
    type: 'bad',
    effects: { health: -10 },
  },
  {
    id: 'food_cache',
    text: '你找到了一个隐藏的食物储藏点！',
    type: 'good',
    effects: { hunger: -20 },
  },
  {
    id: 'rain',
    text: '下起了雨，你收集了一些雨水。',
    type: 'good',
    effects: { thirst: -12 },
  },
  {
    id: 'find_stone_vein',
    text: '你发现了一处石矿脉！',
    type: 'good',
    effects: { stone: 10 },
  },
  {
    id: 'fall',
    text: '你在行走时不小心摔倒了。',
    type: 'bad',
    effects: { health: -6 },
  },
  {
    id: 'sunny',
    text: '今天阳光明媚，你感觉精神焕发。',
    type: 'good',
    effects: { health: 5 },
  },
  {
    id: 'find_dead_tree',
    text: '你发现了一棵枯死的大树。',
    type: 'good',
    effects: { wood: 12 },
  },
  {
    id: 'food_poisoning',
    text: '你吃了不干净的东西，感觉有些不适。',
    type: 'bad',
    effects: { health: -8, hunger: 8 },
  },
  {
    id: 'peaceful_day',
    text: '平静的一天，什么也没有发生。',
    type: 'neutral',
    effects: {},
  },
  {
    id: 'find_cave',
    text: '你发现了一个山洞，里面有一些石头和木材。',
    type: 'good',
    effects: { stone: 6, wood: 4 },
  },
]

export const nightEvents: RandomEvent[] = [
  {
    id: 'wolf_howl',
    text: '远处传来狼嚎声，你整夜不敢入睡。',
    type: 'bad',
    effects: { health: -8, hunger: 5 },
  },
  {
    id: 'night_frost',
    text: '夜间霜冻来袭，你的身体被冻得发僵。',
    type: 'bad',
    effects: { health: -10, wood: -3 },
  },
  {
    id: 'peaceful_sleep',
    text: '你度过了平静的一夜，精力得到了恢复。',
    type: 'good',
    effects: { health: 8 },
  },
  {
    id: 'night_raid',
    text: '有野兽趁夜色偷走了你的物资！',
    type: 'bad',
    effects: { wood: -6, stone: -4 },
  },
  {
    id: 'night_rain',
    text: '夜间下起了雨，你收集了雨水但也淋湿了身体。',
    type: 'neutral',
    effects: { thirst: -10, health: -3 },
  },
  {
    id: 'moonlit_berries',
    text: '月光下你意外发现了一些夜间生长的浆果。',
    type: 'good',
    effects: { hunger: -10 },
  },
  {
    id: 'mosquito_swarm',
    text: '蚊虫成群袭来，你被叮咬得无法安睡。',
    type: 'bad',
    effects: { health: -5, hunger: 3 },
  },
  {
    id: 'night_cache',
    text: '借着月光，你发现了白天遗漏的物资。',
    type: 'good',
    effects: { wood: 5, stone: 3 },
  },
  {
    id: 'nightmare',
    text: '你做了噩梦，在惊恐中醒来，一身冷汗。',
    type: 'bad',
    effects: { health: -3, hunger: 4, thirst: 4 },
  },
  {
    id: 'warm_fire',
    text: '篝火温暖地燃烧了一整夜，你睡得很安稳。',
    type: 'good',
    effects: { health: 5, hunger: -3 },
  },
  {
    id: 'night_scavenger',
    text: '夜间拾荒者帮你留下了一些有用的东西。',
    type: 'good',
    effects: { stone: 7 },
  },
  {
    id: 'cold_wind',
    text: '寒风呼啸整夜，你蜷缩在角落瑟瑟发抖。',
    type: 'bad',
    effects: { health: -7, thirst: 3 },
  },
]

export const nightDecay = {
  hunger: 6,
  thirst: 8,
}
