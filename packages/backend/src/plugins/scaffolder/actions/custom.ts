import { createTemplateAction } from '@backstage/plugin-scaffolder-node';
import { writeFile } from 'fs';

export const createNewFileAction = () => {
    return createTemplateAction<{ contents: string; filename: string }>({
        id: 'skip:pgvm:create',
        schema: {
            input: {
                required: ['Teamname', 'hardware_config', 'datadiskSize', 'branch', 'Tune', 'name', 'dbuser', 'dbpassword'],
                type: 'object',
                properties: {
                    Teamname: {
                        type: 'string',
                        title: 'Team-name',
                        description: 'Name of the team responsible for this database',
                    },
                    hardware_config: {
                        type: 'string',
                        title: 'Hardware config',
                        description: 'Hardware configuration for the VM',
                    },
                    datadiskSize: {
                        type: 'string',
                        title: 'Data disk-size',
                        description: 'Size of the disk in GB (50-500GB)',
                    },
                    branch: {
                        type: 'string',
                        title: 'Branch',
                        description: 'The environment this database is running in',
                    },
                    Tune: {
                        type: 'string',
                        title: 'Database tuning profile',
                        description: 'The tuning profile to use',
                    },
                    name: {
                        type: 'string',
                        title: 'VM name',
                        description: 'Name of the VM',
                    },
                    dbuser: {
                        type: 'string',
                        title: 'Database user',
                        description: 'The database user to create',
                    },
                    dbpassword: {
                        type: 'string',
                        title: 'Database password',
                        description: 'The database password to use',
                    },
                },
            },
        },
        async handler(ctx) {
            const { signal } = ctx;
            await writeFile(
                `${ctx.workspacePath}/${ctx.input.filename}`,
                ctx.input.contents,
                { signal },
                _ => {},
            );
        },
    });
};