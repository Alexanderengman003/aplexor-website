-- Add RLS policy for user_roles table so users can read their own roles
CREATE POLICY "Users can read their own roles"
ON user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);