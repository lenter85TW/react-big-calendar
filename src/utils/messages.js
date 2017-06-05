import invariant from 'invariant';

 let defaultMessages = {
     date: 'Date',
     time: 'Time',
     event: 'Event',
     allDay: '종일',
     week: '주',
     day: '일',
     month: '월',
     previous: '이전',
     next: '다음',
     yesterday: '어제',
     tomorrow: '내일',
     today: '오늘',
     agenda: 'agenda',

  showMore: total => `+${total} more`
}

export function set(key, msg){
  invariant(messages.hasOwnProperty(key),
    `The message key: "${key}" is not a valid message name. ` +
    `valid keys are: ${Object.keys(messages).join(', ')}`
  )

  messages[key] = msg;
}

export function result(msg, ...args){
  return typeof msg === 'function' ? msg(args) : msg
}

export default function messages(msgs) {
  return {
    ...defaultMessages,
    ...msgs
  }
}
