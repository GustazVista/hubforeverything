export type Field = { k: string; l: string; t?: 'text' | 'url' | 'date' | 'textarea' | 'number' | 'select'; o?: string[]; r?: boolean }
export type Section = { table: string; label: string; single?: boolean; fields: Field[] }

export const SECTIONS: Record<string, Section> = {
  university: { table: 'my_university', label: 'My University', single: true, fields: [
    { k: 'name', l: 'University name', r: true }, { k: 'platform', l: 'Learning platform (Moodle, Canvas…)' },
    { k: 'platform_url', l: 'Platform link', t: 'url' }, { k: 'portal_url', l: 'Student portal link', t: 'url' },
    { k: 'major', l: 'Major / program' }, { k: 'year', l: 'Year / semester' }, { k: 'gpa', l: 'Current GPA' },
    { k: 'notes', l: 'Notes', t: 'textarea' }] },
  courses: { table: 'courses', label: 'Courses & Learning', fields: [
    { k: 'name', l: 'Course name', r: true }, { k: 'platform', l: 'Platform' }, { k: 'instructor', l: 'Instructor' },
    { k: 'url', l: 'Course URL', t: 'url' }, { k: 'start_date', l: 'Start date', t: 'date' },
    { k: 'status', l: 'Status', t: 'select', o: ['want to learn', 'planned', 'in progress', 'completed', 'paused'] },
    { k: 'progress', l: 'Progress %', t: 'number' }, { k: 'notes', l: 'Notes', t: 'textarea' }] },
  projects: { table: 'projects', label: 'Projects', fields: [
    { k: 'name', l: 'Project title', r: true }, { k: 'tech', l: 'Technologies' }, { k: 'url', l: 'Live website', t: 'url' },
    { k: 'repo', l: 'GitHub repository', t: 'url' }, { k: 'due_date', l: 'Expected completion', t: 'date' },
    { k: 'status', l: 'Status', t: 'select', o: ['idea', 'planned', 'in progress', 'completed', 'on hold'] },
    { k: 'progress', l: 'Progress %', t: 'number' }, { k: 'notes', l: 'Notes', t: 'textarea' }] },
  websites: { table: 'websites', label: 'Websites & Resources', fields: [
    { k: 'name', l: 'Title', r: true }, { k: 'url', l: 'URL', t: 'url', r: true },
    { k: 'category', l: 'Category', t: 'select', o: ['Programming', 'Cybersecurity', 'Artificial Intelligence', 'Machine Learning', 'Research', 'University Research', 'Productivity', 'Design', 'Writing', 'Mathematics', 'Science', 'Business', 'Language Learning', 'Entertainment', 'Other'] },
    { k: 'notes', l: 'Notes', t: 'textarea' }] },
  notes: { table: 'notes', label: 'Notes & Research', fields: [
    { k: 'name', l: 'Title', r: true }, { k: 'body', l: 'Content', t: 'textarea' }] },
  books: { table: 'books', label: 'Books & Reading', fields: [
    { k: 'name', l: 'Title', r: true }, { k: 'author', l: 'Author' },
    { k: 'status', l: 'Status', t: 'select', o: ['want to read', 'reading', 'completed', 'paused'] },
    { k: 'notes', l: 'Review & notes', t: 'textarea' }] },
}
