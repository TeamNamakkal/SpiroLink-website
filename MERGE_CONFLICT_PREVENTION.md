# Merge Conflict Prevention Guide

## Overview
This document provides best practices to prevent merge conflicts when working on this project, especially with the I18n (internationalization) branch.

## Key Areas Prone to Conflicts

### 1. **Header.tsx** - Right Side Actions
**Location:** `src/components/Header.tsx` (Lines 205-225)

**Risk Area:**
```tsx
{/* Right side actions */}
<div className="flex items-center gap-4">
  {/* Language Selector */}
  <LanguageSelector />

  {/* Country Selector */}
  <CountrySelector />

  {/* Sign In */}
  <button>...</button>
</div>
```

**Prevention Rules:**
- ✅ Keep Language and Country selectors ONLY once
- ✅ Do NOT duplicate these components
- ✅ Maintain exact spacing and ordering
- ✅ Keep all comments as markers to identify correct sections

### 2. **Footer.tsx** - Share Button Section
**Location:** `src/components/Footer.tsx` (Lines 85-110)

**Risk Area:**
```tsx
<div className="flex gap-4 items-center">
  <ShareButton />
  {/* Social Links */}
</div>
```

**Prevention Rules:**
- ✅ Include ShareButton component
- ✅ Keep `items-center` class in footer flex container
- ✅ Do NOT remove or duplicate ShareButton

### 3. **Page Files** - Import and Function Declaration
**Affected Files:**
- `src/pages/PonFtth.tsx`
- `src/pages/Services.tsx`
- `src/pages/OpticalLongHaul.tsx`
- `src/pages/Resources.tsx`
- `src/pages/MicrowaveNetwork.tsx`
- `src/pages/WifiNetwork.tsx`
- And all other page files

**Correct Pattern:**
```tsx
import { useI18n } from '../i18n/I18nProvider';

export default function PageName() {
  const { t } = useI18n();
  
  return (
    <>
      {/* Page content */}
    </>
  );
}
```

**Prevention Rules:**
- ✅ ALWAYS include the I18n import
- ✅ ALWAYS declare the function ONCE with `export default function`
- ✅ ALWAYS initialize `const { t } = useI18n();`
- ✅ Do NOT duplicate any of these lines

## Git Best Practices

### When Merging with `origin/sampritha-branch`:

1. **Fetch Latest Changes**
   ```bash
   git fetch origin
   ```

2. **Check for Conflicts Before Merging**
   ```bash
   git merge --no-commit --no-ff origin/sampritha-branch
   # Review changes
   git merge --abort  # If needed
   ```

3. **Use Strategic Merge**
   - For `sampritha-branch` (I18n features): Use their version more often
   - For custom styling/fixes: Use your version

4. **Conflict Resolution Strategy**
   ```bash
   # Prefer sampritha-branch for I18n translations
   git checkout --theirs src/pages/*.tsx src/components/*.tsx
   ```

5. **Always Verify After Merge**
   ```bash
   npm run dev
   # Check for compilation errors
   npm run build
   ```

## Identifying Merge Conflicts

### Signs of Conflict:
```tsx
<<<<<<< HEAD
  // Your version
=======
  // Their version
>>>>>>> origin/sampritha-branch
```

### How to Fix:
1. Identify which version is correct
2. Remove conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`)
3. Keep the correct version
4. Test the application

### Prevention:
- Review merge conflicts IMMEDIATELY
- Don't let conflicts accumulate
- Test after each merge resolution

## File-Specific Guidelines

### Header.tsx
- **No duplicates of:** LanguageSelector, CountrySelector
- **Keep:** I18n imports, useI18n hook
- **Testing:** Verify header shows one of each selector

### Footer.tsx
- **Keep:** ShareButton component
- **Keep:** Import statements for I18n
- **Testing:** Verify footer displays properly with share button

### Page Files (pages/*.tsx)
- **Format:** All start with imports, then export default function
- **Pattern:** Same structure across all pages
- **Testing:** Each page should render without merge conflict markers

## Post-Merge Checklist

After any merge, run:

```bash
# 1. Check for remaining conflict markers
grep -r "<<<<<<< HEAD" src/

# 2. Verify no duplicates
grep -n "LanguageSelector\|CountrySelector" src/components/Header.tsx

# 3. Run dev server
npm run dev

# 4. Check console for errors
npm run build

# 5. Verify in browser
# Visit http://localhost:5173
# Check that Header looks correct (one language, one country selector)
```

## Common Mistakes to Avoid

❌ **DON'T:** Keep both versions of conflicting code
❌ **DON'T:** Duplicate components (Language/Country selectors)
❌ **DON'T:** Keep conflict markers in code
❌ **DON'T:** Merge without testing
❌ **DON'T:** Commit code with TypeScript errors

✅ **DO:** Choose one version and delete the other
✅ **DO:** Remove ALL conflict markers
✅ **DO:** Test immediately after merging
✅ **DO:** Run `npm run build` to catch errors
✅ **DO:** Commit clean, tested code

## Emergency Resolution

If merge becomes too complicated:

```bash
# Start fresh
git merge --abort

# Or reset to main
git reset --hard origin/main

# Then manually apply needed changes
```

## Questions?

Refer to individual file patterns shown above or review git history:
```bash
git log --oneline src/components/Header.tsx
```
