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
const AutoImport = (...entries) => ({children}) => {
  children.unshift(/**@type{import('mdast-util-mdx').MdxjsEsm}*/({
    type: 'mdxjsEsm',
    data: {
      estree: {
        type: 'Program',
        sourceType: 'module',
        body: entries.map(entry => ({
          type: 'ImportDeclaration',
          specifiers: [
            ...(entry.default ? [{
              type: 'ImportDefaultSpecifier',
              local: {type: 'Identifier', name: entry.default},
            }] : []),
            ...(entry.namespace ? [{
              type: 'ImportNamespaceSpecifier',
              local: {type: 'Identifier', name: entry.namespace},
            }] : []),
            ...(entry.import ?? []).map(e => ({
              type: 'ImportSpecifier',
              imported: {
                type: 'Identifier',
                name: typeof e === 'string' ? e : e.import,
              },
              local: {
                type: 'Identifier',
                name: typeof e === 'string' ? e : e.as,
              },
            })),
          ],
          source: {
            type: 'Literal',
            value: entry.from,
          },
        })),
      },
    },
  }));
};

module.exports = AutoImport;
