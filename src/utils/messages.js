import invariant from 'invariant';

//언어 설정 여기다
 let defaultMessages = {
     date: 'Date',
     time: 'Time',
     event: 'Event',
     allDay: '종일',
     week: '주간',
     day: '일간',
     month: '월간',
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
