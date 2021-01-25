import { Text } from '../../entities'

export interface TextRepository {
    findAllTexts: () => Promise<Text[]>
    findTextByCode: (code: number) => Promise<Text | undefined>
    add: (text: Text) => Promise<Text>
    exists: (code: number) => Promise<boolean>
}
