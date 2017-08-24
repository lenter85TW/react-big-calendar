import dates from './dates';
import { accessor as get } from './accessors';

export function endOfRange(dateRange, unit = 'day') {
  return {
    first: dateRange[0],
    last: dates.add(dateRange[dateRange.length - 1], 1, unit)
  }
}

export function eventSegments(event, first, last, { startAccessor, endAccessor }) {
  let slots = dates.diff(first, last, 'day')
  let start = dates.max(dates.startOf(get(event, startAccessor), 'day'), first);
  let end = dates.min(dates.ceil(get(event, endAccessor), 'day'), last)

  let padding = dates.diff(first, start, 'day');
  let span = dates.diff(start, end, 'day');

  span = Math.min(span, slots)
  span = Math.max(span, 1);

  return {
    event,
    span,
    left: padding + 1,
    right: Math.max(padding + span, 1)
  }
}


export function segStyle(span, slots){
  let per = (span / slots) * 100 + '%';
  return { flexBasis: per, maxWidth: per } // IE10/11 need max-width. flex-basis doesn't respect box-sizing
}

export function eventLevels(rowSegments, limit = Infinity){
  let i, j, seg
    , levels = []
    , extra = [];

  for (i = 0; i < rowSegments.length; i++) {
    seg = rowSegments[i];

    for (j = 0; j < levels.length; j++)
      if (!segsOverlap(seg, levels[j]))
        break

    if (j >= limit) {
      extra.push(seg)
    }
    else {
      (levels[j] || (levels[j] = [])).push(seg);
    }
  }

  for (i = 0; i < levels.length; i++) {
    levels[i].sort((a, b) => a.left - b.left); //eslint-disable-line
  }

  return { levels, extra };
}

export function inRange(e, start, end, { startAccessor, endAccessor }){
  let eStart = dates.startOf(get(e, startAccessor), 'day')
  let eEnd = get(e, endAccessor)

  let startsBeforeEnd = dates.lte(eStart, end, 'day')
  let endsAfterStart = dates.gte(eEnd, start, 'day')

  return startsBeforeEnd && endsAfterStart
}


export function segsOverlap(seg, otherSegs) {
  return otherSegs.some(
    otherSeg => otherSeg.left <= seg.right && otherSeg.right >= seg.left)
}


export function sortEvents(evtA, evtB, { startAccessor, endAccessor, allDayAccessor }) { //allDayAccessor는 종일인지 비종일인지 true, false값을 리턴하는 함수. 리액트빅캘린더 컴포넌트 도입할때 같이 넘겨준다.
  let startSort = +dates.startOf(get(evtA, startAccessor), 'day') - +dates.startOf(get(evtB, startAccessor), 'day')

  let durA = dates.diff(
        get(evtA, startAccessor)
      , dates.ceil(get(evtA, endAccessor), 'day')
      , 'day');

  let durB = dates.diff(
        get(evtB, startAccessor)
      , dates.ceil(get(evtB, endAccessor), 'day')
      , 'day');

  let results = (durA > 1 && durB > 1) ? Math.max(durA, 1) - Math.max(durB, 1) : Math.max(durB, 1) - Math.max(durA, 1)
  let results2 = 0;
    if(evtA.schedule_option === 'all_day' && evtB.schedule_option === 'all_day'){
      results2 = evtA.period_type_num - evtB.period_type_num;
    }

    let results3 = evtA.schedule_idx - evtB.schedule_idx;




  return startSort // sort by start Day first
    // || Math.max(durA, 1) - Math.max(durB, 1)   // events spanning multiple days go first
    || results
    //|| results2
    || !!get(evtB, allDayAccessor) - !!get(evtA, allDayAccessor) // then allDay single day events
    || +get(evtA, startAccessor) - +get(evtB, startAccessor)     // then sort by start time
    || results3
}
