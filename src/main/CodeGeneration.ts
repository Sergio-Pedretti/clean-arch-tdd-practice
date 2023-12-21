export interface CodeGeneration {
    generate: () => Promise<string>
}

export class CodeGenerationSimple implements CodeGeneration {
    async generate(): Promise<string> {
        const year = new Date().getFullYear();
        const randomCode = Math.round(Math.floor(Math.random() * 10000000))
        return `${year}${randomCode}`
    }
}