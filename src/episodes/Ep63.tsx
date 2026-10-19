import React from 'react';
import {Stage} from '../stage';
import {C} from '../theme';

export const Ep63: React.FC = () => (
  <Stage
    sub="n9"
    props={{
      o1: {room: true, phone: {title: 'TODAY ONLY', value: '$0', color: C.green}, bubble: 'free?!'},
      c1a: {room: true, phone: {title: 'MY PHONE', value: 'cracked', color: C.red}},
      n20: {room: true, sign: 'TODAY ONLY'},
      c1c: {room: true, sign: 'FREE iPHONE'},
      n1: {room: true, phone: {title: 'NEW PHONE', value: '$0', color: C.green}},
      n2: {room: true, bubble: 'sign here!'},
      c1g: {room: true, phone: {title: 'DUE TODAY', value: '$90', color: C.red}},
      n4: {room: true, bubble: 'it is still free'},
      c2c: {phone: {title: 'MY BILL', value: '-$33 +$33', color: C.ink}},
      n22: {notif: {title: 'Mom', body: "that's a payment wearing a mask"}},
      c2f: {title: '1 bite a month', money: 1},
      n5: {title: 'month 31 of 36', money: 1},
      n6: {phone: {title: 'MY PLAN', value: '$90/mo', color: C.red}},
      n23: {phone: {title: 'HOTSPOT', value: 'never used', color: C.ink}},
      c3f: {title: 'door A vs door B', sign: 'A or B?'},
      n7: {title: 'guess in the comments', bubble: 'door A!'},
      c4a: {laptop: '#DDEBF7', title: 'who invented free phones?'},
      c4b: {laptop: '#DDEBF7', title: '2007: up to $600'},
      c4c: {laptop: '#DDEBF7', title: '2008: $199'},
      n24: {laptop: '#DDEBF7', title: 'lines around the block'},
      c4f: {laptop: '#DDEBF7', title: 'contracts killed'},
      c4h: {phone: {title: 'COUPON', value: '1 of 36', color: C.green}},
      n8: {phone: {title: 'COUPON', value: '36 months', color: C.red}},
      c5b: {title: '$90 − $25 = $65/mo', money: 3},
      n25: {title: '$65 every month', money: 3},
      n9: {title: 'free = $1,140', money: 6},
      c5g: {laptop: '#FFE3EA', title: 'phones sold below cost'},
      c5i: {title: 'free fish', money: 4},
      n10: {title: 'water: $90/mo', money: 4},
      c5j: {title: '99 of 100 stay', bubble: 'nobody leaves'},
      c6b: {phone: {title: 'CHEAP PLAN', value: '$25/mo', color: C.green}},
      c6d: {phone: {title: 'CHEAP PLAN', value: 'same towers', color: C.ink}},
      c6f: {phone: {title: 'CHEAP PLAN', value: 'same towers', color: C.ink}},
      n11: {phone: {title: '$90 vs $25', value: 'same', color: C.ink}},
      n27: {phone: {title: 'LOCKED', value: 'pay first', color: C.red}},
      c6j: {laptop: '#DDEBF7', title: 'the lock fight'},
      n12: {title: "can't afford to leave", money: 0},
      c8b: {title: 'return window', sign: 'RETURNS'},
      n13: {title: 'day 13 of 14', bubble: 'too lazy to mail it'},
      c8f: {phone: {title: 'UNLOCKED', value: 'no leash', color: C.green}},
      c8g: {title: 'do the napkin math', money: 2},
      c8i: {room: true, bubble: 'great news Chad'},
      c9a: {room: true, sign: 'FREE WATCH'},
      c9m: {room: true, bubble: '...'},
      c9c: {room: true, phone: {title: 'RESTOCKING', value: '$55', color: C.red}},
      c9e: {title: '+$65 every month', money: 5},
      n29: {phone: {title: 'CHEAP PLAN', value: 'all good', color: C.green}},
      r4: {title: 'next: split it evenly', bubble: "let's just split it"},
    }}
  />
);
