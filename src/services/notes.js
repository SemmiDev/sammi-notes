import { supabase } from './supabase';

export const findNotesByIDAndUserID = async ($id, $userid) => {
    const { data, error } = await supabase
        .from('notes')
        .select('*')
        .filter('id', 'eq', $id)
        .filter('user_id', 'eq', $userid);
    if (error) {
        return {
            success: false,
            error: error,
        };
    }
    return {
        success: true,
        data: data[0],
    };
};

export const findAllNotesByUserID = async ($userid) => {
    const { data, error } = await supabase
        .from('notes')
        .select('*')
        .filter('user_id', 'eq', $userid)
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

export const saveNotes = async ({ user_id, title, body }) => {
    const { error } = await supabase
        .from('notes')
        .insert({ user_id: user_id, title: title, body: body });
    return error;
};

export const updateNotes = async ({ id, user_id, title, body }) => {
    const { error } = await supabase
        .from('notes')
        .update({ title: title, body: body })
        .match({ id: id, user_id: user_id });
    return error;
};
