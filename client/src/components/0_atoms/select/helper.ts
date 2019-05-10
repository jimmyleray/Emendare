/**
 * Return true if the current value is
 * @param options list of options
 * @param selectedValue current value selected
 */
export const hasSelectedValueInOptions = (
  options: Array<{ value: string; label: string }>,
  selectedValue: string
) =>
  options.find(
    (option: { label: string; value: string }) => option.value === selectedValue
  )
