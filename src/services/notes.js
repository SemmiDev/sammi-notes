import { supabase } from './supabase';

export const findNotesByIDAndUserID = async (noteId, userId) => {
    const { data, error } = await supabase
        .from('notes')
        .select(
            `
            id,
            user_id,
            title,
            body,
            tags (
                id,
                name
            )
            `
        )
        .filter('id', 'eq', noteId)
        .filter('user_id', 'eq', userId)
        .single();

    if (error) {
        return {
            success: false,
            error: error,
        };
    }

    return {
        success: true,
        data: data,
    };
};

export const findAllNotesByUserID = async (userId) => {
    const { data, error } = await supabase
        .from('notes')
        .select(
            `
        id,
        title,
        body,
        updated_at,
        tags (
            id,
            name
        )
        `
        )
        .order('updated_at', { ascending: false });

    if (error) {
        return {
            success: false,
            error: error,
        };
    }

    return {
        success: true,
        data: data,
    };
};

export const saveNotes = async ({ userId, title, body, tags }) => {
    // insert data on table notes
    const { data, error } = await supabase
        .from('notes')
        .insert({ user_id: userId, title: title, body: body })
        .select('id')
        .single();

    if (error) {
        return {
            success: false,
            error: error,
        };
    }

    // if tags is empty, so that means we don't need to save tags
    // return immediately
    if (tags.length === 0) {
        return {
            success: true,
            data: data,
        };
    }

    // build tags to insert
    const tagsToInsert = tags.map((tag) => ({ name: tag }));

    // save tags on table tags
    // and get the id for each tag
    // the id's will be used to save on table note_tags
    const { data: dataTags, error: errorTags } = await supabase
        .from('tags')
        .insert(tagsToInsert)
        .select('id');

    if (errorTags) {
        return {
            success: false,
            error: errorTags,
        };
    }

    // build note_tags to insert
    const noteTagsInsert = dataTags.map((tag) => ({
        note_id: data.id,
        tag_id: tag.id,
    }));

    // save tags on table note_tags
    const { error: errorNotesTags } = await supabase
        .from('note_tags')
        .insert(noteTagsInsert);

    if (errorNotesTags) {
        return {
            success: false,
            error: errorNotesTags,
        };
    }

    return {
        success: true,
        error: null,
    };
};

export const deleteTags = async (tagId) => {
    const { error } = await supabase.from('tags').delete().eq('id', tagId);
    return error;
};

export const updateNotes = async ({ id, userId, title, body, tags }) => {
    // update notes
    const { error } = await supabase
        .from('notes')
        .update({ title: title, body: body })
        .match({ id: id, user_id: userId });

    if (error) {
        return {
            success: false,
            error: error,
        };
    }

    // firts, remove all tags from note
    const { data: dataTagIds, error: errorRemoveNote } = await supabase
        .from('note_tags')
        .delete()
        .eq('note_id', id)
        .select('tag_id');

    if (errorRemoveNote) {
        return {
            success: false,
            error: error,
        };
    }

    // remove tags from table tags
    for (const tag of dataTagIds) {
        const { error: errorRemoveTag } = await supabase
            .from('tags')
            .delete()
            .eq('id', tag.tag_id);

        if (errorRemoveTag) {
            return {
                success: false,
                error: error,
            };
        }
    }

    // if tags is empty, so that means we don't need to save tags
    // return immediately
    if (tags.length === 0) {
        return {
            success: true,
            data: data,
        };
    }

    // build tags to insert
    const tagsToInsert = tags.map((tag) => ({ name: tag }));
    const { data: dataTags, error: errorTags } = await supabase
        .from('tags')
        .insert(tagsToInsert)
        .select('id');

    if (errorTags) {
        return {
            success: false,
            error: errorTags,
        };
    }

    // build note_tags to insert
    const noteTagsInsert = dataTags.map((tag) => ({
        note_id: id,
        tag_id: tag.id,
    }));

    // save tags on table note_tags
    const { error: errorNotesTags } = await supabase
        .from('note_tags')
        .insert(noteTagsInsert);

    if (errorNotesTags) {
        return {
            success: false,
            error: errorNotesTags,
        };
    }

    return error;
};

export const removeTags = async (tagsIds) => {
    const buildTagsIds = tagsIds.map((tag) => tag.id);
    const { error } = await supabase
        .from('tags')
        .delete()
        .match({ id: buildTagsIds });

    return error;
};

export const removeAllTagsFromNote = async (noteId) => {
    const { data, error } = await supabase
        .from('note_tags')
        .delete()
        .match({ note_id: noteId })
        .select('id');
    if (error) {
        return {
            success: false,
            error: error,
        };
    }

    return {
        success: true,
        data: data,
    };
};
