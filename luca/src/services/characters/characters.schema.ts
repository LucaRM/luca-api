// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import type { Static } from '@feathersjs/typebox'
import { ObjectIdSchema, Type, getValidator, querySyntax } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema

export const abilityScoresSchema = Type.Object(
    {
        key: Type.Number()
    },
    { $id: 'AbilityScores', additionalProperties: true }
)

export const savingThrowSchema = Type.Object(
    {
        key: Type.String()
    },
    { $id: 'Saving Throws', additionalProperties: true }
)

export const skillSchema = Type.Object(
    {
        name: Type.String(),
        proficiency: Type.String(),
        ability: Type.String(),
        order: Type.String(),
        addon: Type.Boolean()
    },
    { $id: 'Skill', additionalProperties: true }
)

export const skillsSchema = Type.Array(skillSchema)

export const characterSchema = Type.Object(
    {
        _id: ObjectIdSchema(),
        user: Type.String(),
        system: Type.String(),
        name: Type.String(),
        level: Type.Number(),
        class: Type.String(),
        abilityScores: abilityScoresSchema,
        savingThrow: savingThrowSchema,
        skills: skillsSchema
    },
    { $id: 'Character', additionalProperties: true }
)
export type Character = Static<typeof characterSchema>
export const characterValidator = getValidator(characterSchema, dataValidator)
export const characterResolver = resolve<Character, HookContext>({})

export const characterExternalResolver = resolve<Character, HookContext>({})

// Schema for creating new entries
export const characterDataSchema = Type.Pick(characterSchema, ['name', 'level', 'class', 'user', 'system'], {
    $id: 'CharacterData'
})
export type CharacterData = Static<typeof characterDataSchema>
export const characterDataValidator = getValidator(characterDataSchema, dataValidator)
export const characterDataResolver = resolve<Character, HookContext>({})

// Schema for updating existing entries
export const characterPatchSchema = Type.Partial(characterSchema, {
    $id: 'CharacterPatch'
})
export type CharacterPatch = Static<typeof characterPatchSchema>
export const characterPatchValidator = getValidator(characterPatchSchema, dataValidator)
export const characterPatchResolver = resolve<Character, HookContext>({})

// Schema for allowed query properties
export const characterQueryProperties = Type.Pick(characterSchema, ['_id', 'name', 'level', 'class'])
export const characterQuerySchema = Type.Intersect(
    [
        querySyntax(characterQueryProperties),
        // Add additional query properties here
        Type.Object({}, { additionalProperties: false })
    ],
    { additionalProperties: false }
)
export type CharacterQuery = Static<typeof characterQuerySchema>
export const characterQueryValidator = getValidator(characterQuerySchema, queryValidator)
export const characterQueryResolver = resolve<CharacterQuery, HookContext>({})
