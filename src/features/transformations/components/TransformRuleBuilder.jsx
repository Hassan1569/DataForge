import { Plus, Trash2 } from 'lucide-react';
import Button from '@/components/ui/Button.jsx';

const RULE_TYPES = [
  { value: 'trim', label: 'Trim Whitespace', requiresField: true },
  { value: 'uppercase', label: 'Convert to Uppercase', requiresField: true },
  { value: 'lowercase', label: 'Convert to Lowercase', requiresField: true },
  { value: 'remove_empty_rows', label: 'Remove Empty Rows', requiresField: false },
];

export default function TransformRuleBuilder({ headers, rules, onAddRule, onRemoveRule }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-ink-900">Active Rules</h4>
        <Button size="sm" variant="secondary" onClick={() => onAddRule({
          id: Date.now(),
          type: 'trim',
          field: headers[0] || ''
        })}>
          <Plus size={14} className="mr-1" /> Add Rule
        </Button>
      </div>

      {rules.length === 0 ? (
        <div className="rounded-md border border-dashed border-ink-200 bg-ink-50 py-8 text-center text-sm text-ink-500">
          No rules added yet. Add a rule to start transforming data.
        </div>
      ) : (
        <div className="space-y-3">
          {rules.map((rule, index) => {
            const config = RULE_TYPES.find(r => r.value === rule.type);
            
            return (
              <div key={rule.id} className="flex flex-col gap-2 rounded-md border border-ink-200 bg-white p-3 shadow-sm sm:flex-row sm:items-center">
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <select
                    value={rule.type}
                    onChange={(e) => {
                      const newRule = { ...rule, type: e.target.value };
                      // Reset field if new rule doesn't require it
                      if (!RULE_TYPES.find(r => r.value === e.target.value).requiresField) {
                        newRule.field = null;
                      } else if (!newRule.field) {
                        newRule.field = headers[0];
                      }
                      onAddRule(newRule, index); // update existing
                    }}
                    className="rounded-md border border-ink-300 p-1.5 text-sm text-ink-800"
                  >
                    {RULE_TYPES.map(r => (
                      <option key={r.value} value={r.value}>{r.label}</option>
                    ))}
                  </select>

                  {config?.requiresField && (
                    <select
                      value={rule.field || ''}
                      onChange={(e) => onAddRule({ ...rule, field: e.target.value }, index)}
                      className="rounded-md border border-ink-300 p-1.5 text-sm text-ink-800"
                    >
                      {headers.map(h => (
                        <option key={h} value={h}>{h}</option>
                      ))}
                    </select>
                  )}
                </div>
                
                <button
                  onClick={() => onRemoveRule(index)}
                  className="self-end rounded p-1.5 text-ink-400 hover:bg-danger-50 hover:text-danger-600 sm:self-auto"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}