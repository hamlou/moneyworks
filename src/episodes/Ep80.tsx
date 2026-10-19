import React from 'react';
import {Stage} from '../stage';
import {C} from '../theme';

export const Ep80: React.FC = () => (
  <Stage
    sub="c2f"
    props={{
      o2: {title: 'dinner for 8', sign: 'SPLIT IT?', bubble: 'no no, it\'s fine', room: true},
      c1a: {title: 'one week of being nice', phone: {title: 'MY BANK', value: '$1,240'}},
      c1b: {title: 'Monday: dinner', sign: 'BILL $480', bubble: 'I had a salad...', room: true},
      n1: {title: 'Monday', phone: {title: 'MY BANK', value: '-$60', color: C.red}},
      c1d: {title: 'Tuesday', notif: {title: 'Cousin Mike', body: 'can I borrow $400? pay u back friday'}, phone: {title: 'MY BANK', value: '-$400', color: C.red}},
      c1f: {title: 'Wednesday 5:59 pm', laptop: '#FFE3EA', bubble: 'just one little thing...'},
      n4: {title: 'Wednesday', laptop: '#FFE3EA', sign: '3 HRS UNPAID'},
      c1g: {title: 'Thursday', sign: 'WARRANTY $89', bubble: 'he seemed so nice', room: true},
      c1h: {title: 'Friday', notif: {title: 'New job offer', body: 'Salary: $52,000. Accept?'}, bubble: 'YES! thank you!!'},
      n5: {title: 'Friday', notif: {title: 'New job offer', body: 'Salary: $52,000. Accept?'}},
      n7: {title: 'the nice tax', money: 2, sign: 'NICE TAX'},
      c2b: {title: 'the study: do nice guys finish last?', laptop: '#DDEBF7'},
      n8: {title: 'the answer', sign: 'KIND OF YES'},
      n9: {title: 'nice vs less nice', money: 4, bubble: '+18%'},
      c2f: {title: 'the first number', notif: {title: 'Offer', body: 'Salary: $52,000 (room to ask)'}},
      n10: {title: 'the price tag', sign: 'PRICE $10', bubble: 'everyone pays $8...'},
      n12: {title: 'one question', money: 3, bubble: 'is there any flexibility?'},
      c2i: {title: 'the cousin loan', phone: {title: 'OWED TO ME', value: '$400', color: C.red}},
      n14: {title: '11 Fridays later', notif: {title: 'Cousin Mike', body: 'what $400?'}},
      c2j: {title: 'the loyal worker', laptop: '#EDEFF2', sign: 'NO RAISE'},
      c3b: {title: 'age 8', bubble: 'say thank you. don\'t count it.', room: true},
      n15: {title: 'what we learned', sign: 'MONEY = RUDE'},
      c3d: {title: 'keeping the peace', money: 1, bubble: 'just pay...'},
      n32: {title: 'the awkward tax', sign: 'PAID TWICE'},
      n17: {title: 'a question is not a fight', bubble: 'is there room on this number?'},
      c3g: {title: 'who feels bad?', sign: 'LATE FEE $35'},
      n19: {title: 'one day late', phone: {title: 'MY BANK', value: '-$35', color: C.red}},
      n21: {title: 'new rule #1', bubble: 'let me check and get back to you'},
      c4c: {title: 'new rule #2', notif: {title: 'Offer', body: 'Is there any flexibility on the salary?'}},
      n23: {title: 'nobody got fired for asking', bubble: 'thanks for asking!', room: true},
      n34: {title: 'or ask for...', sign: '+1 WEEK VACATION'},
      n25: {title: 'new rule #3: pay me first', phone: {title: 'SAVINGS', value: '+$200', color: C.green}},
      c4e: {title: 'new rule #4', sign: 'ONLY LEND WHAT YOU CAN LOSE'},
      n33: {title: "grandma's rule", bubble: 'a loan is a gift with a long goodbye', room: true},
      c4f: {title: 'new rule #5', sign: 'MY SALAD = $14'},
      n28: {title: 'new rule #6', laptop: '#DDEBF7', bubble: 'can we talk about the extra hours?'},
      n29: {title: 'one month later', phone: {title: 'MY BANK', value: '$2,380', color: C.green}},
      r5: {title: 'next time', bubble: 'why does being broke make us decide worse?'},
    }}
  />
);
