import { RuleElement, RuleGroup, GroupOperator } from '../types/campaign-rules';

export function transformRulesToDb(rules: RuleElement[]): any[] {
  return rules.map(rule => {
    if (rule.type === 'group') {
      return {
        id: rule.id,
        type: 'group',
        match: rule.match,
        conditions: rule.conditions.map(condition => ({
          ...condition,
          id: condition.id || crypto.randomUUID()
        }))
      };
    } else {
      return {
        id: rule.id,
        type: 'group_operator',
        operator: rule.operator
      };
    }
  });
}

export function transformRulesFromDb(dbRules: any[]): RuleElement[] {
  return dbRules.map(rule => {
    if (rule.type === 'group') {
      return {
        id: rule.id,
        type: 'group',
        match: rule.match,
        conditions: rule.conditions
      } as RuleGroup;
    } else {
      return {
        id: rule.id,
        type: 'group_operator',
        operator: rule.operator
      } as GroupOperator;
    }
  });
}