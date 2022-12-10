## Schema

```sql
CREATE TABLE notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES auth.users(id)
);

-- CREATE TABLE tags (
--     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--     name TEXT NOT NULL
-- );

-- CREATE TABLE note_tags (
--     note_id UUID,
--     tag_id UUID,
--     PRIMARY KEY (note_id, tag_id),
--     FOREIGN KEY (note_id) REFERENCES notes(id),
--     FOREIGN KEY (tag_id) REFERENCES tags(id)
-- );
```
