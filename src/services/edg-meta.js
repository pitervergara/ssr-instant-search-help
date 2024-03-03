export default function getBasicMeta(extra) {

    let metaData = {
        // sets document title
        title: 'Edoogle - Pesquisar cursos online',
        // optional; sets final title as "Index Page - My Website", useful for multiple level meta
        titleTemplate: title => `${title}`,

        // meta tags
        meta: {
            description: { name: 'description', content: 'Encontre e compare centenas de cursos online num só lugar' },
            keywords: { name: 'keywords', content: 'Cursos Online, Cursos gratuitos, Cursos gratuitos com certificado' },
            equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
            // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
            ogTitle: {
                property: 'og:title',
                // optional; similar to titleTemplate, but allows templating with other meta properties
                template(ogTitle) {
                    return `${ogTitle} - Edoogle`
                }
            }
        },
        // CSS tags
        link: {
            // material: { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
        },

        // JS tags
        script: {
            ldJson: {
                type: 'application/ld+json',
                innerHTML: '{ "@context": "http://schema.org" }'
            }
        },

        // <html> attributes
        htmlAttr: {
        },

        // <body> attributes
        bodyAttr: {
            // 'action-scope': 'xyz', // generates <body action-scope="xyz">
            empty: undefined // generates <body empty>
        },

        // <noscript> tags
        noscript: {
            default: 'Para navegar em nosso site, você precisa habilitar o JavaScript em seu navegador.'
        }
    }

    if (extra) {
        Object.assign(metaData, extra)
    }

    return metaData
}