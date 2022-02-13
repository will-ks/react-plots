// Overload default TypeScript JSON.stringify definition due to bug: https://github.com/microsoft/TypeScript/issues/18879
interface JSON {
  stringify(
    value: unknown,
    replacer?: (number | string)[] | null,
    space?: string | number
  ): string | undefined;
}
