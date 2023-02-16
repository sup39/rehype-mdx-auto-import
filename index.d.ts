export = AutoImport;
/**
 * @typedef {{
 *   from: string
 *   import?: (
 *     string | {import: string, as: string}
 *   )[]
 *   default?: string
 *   namespace?: string
 * }} ImportEntry
 */
/** @type {import('unified').Plugin<ImportEntry[], import('hast').Root>} */
declare const AutoImport: import('unified').Plugin<ImportEntry[], import('hast').Root>;
declare namespace AutoImport {
    export { ImportEntry };
}
type ImportEntry = {
    from: string;
    import?: (string | {
        import: string;
        as: string;
    })[];
    default?: string;
    namespace?: string;
};
