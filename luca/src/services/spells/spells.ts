// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
    spellDataValidator,
    spellPatchValidator,
    spellQueryValidator,
    spellResolver,
    spellExternalResolver,
    spellDataResolver,
    spellPatchResolver,
    spellQueryResolver
} from './spells.schema'

import type { Application } from '../../declarations'
import { SpellService, getOptions } from './spells.class'
import { spellPath, spellMethods } from './spells.shared'

export * from './spells.class'
export * from './spells.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const spell = (app: Application) => {
    // Register our service on the Feathers application
    app.use(spellPath, new SpellService(getOptions(app)), {
        // A list of all methods this service exposes externally
        methods: spellMethods,
        // You can add additional custom events to be sent to clients here
        events: []
    })
    // Initialize hooks
    app.service(spellPath).hooks({
        around: {
            all: [
                schemaHooks.resolveExternal(spellExternalResolver),
                schemaHooks.resolveResult(spellResolver)
            ]
        },
        before: {
            all: [
                schemaHooks.validateQuery(spellQueryValidator),
                schemaHooks.resolveQuery(spellQueryResolver)
            ],
            find: [],
            get: [],
            create: [
                schemaHooks.validateData(spellDataValidator),
                schemaHooks.resolveData(spellDataResolver)
            ],
            patch: [
                schemaHooks.validateData(spellPatchValidator),
                schemaHooks.resolveData(spellPatchResolver)
            ],
            remove: []
        },
        after: {
            all: []
        },
        error: {
            all: []
        }
    })
}

// Add this service to the service type index
declare module '../../declarations' {
    interface ServiceTypes {
        [spellPath]: SpellService
    }
}
