# TYPOGRAPHY SYSTEM AUDIT
## Brandapt Portfolio - Complete Font Usage Review

---

## **TYPEFACE HIERARCHY**

### **Primary Fonts**
1. **Inter** - ExtraBold (800) for headlines, SemiBold (600) for buttons
2. **JetBrains Mono** - Regular (400) for technical/eyebrow labels, Bold (700) for section titles
3. **System Monospace** - Regular for footer copyright

---

## **SECTION-BY-SECTION BREAKDOWN**

### **🎯 HERO SECTION**

| Element | Font | Weight | Size | Notes |
|---------|------|--------|------|-------|
| Eyebrow | JetBrains Mono | 400 | 0.625-0.75rem | ✅ Uppercase, letter-spacing: 0.3em |
| Main Headline | **Inter** | **800** | 3-6rem | ✅ FlipClockHeadline component |
| Subheadline | JetBrains Mono | 400 | 0.75-0.875rem | ✅ Uppercase, letter-spacing: 0.1em |
| CTA Button | Inter | 600 | 0.875rem | ✅ Uppercase, letter-spacing: 0.1em |

---

### **💼 WORK SECTION**

| Element | Font | Weight | Size | Notes |
|---------|------|--------|------|-------|
| Eyebrow Label | JetBrains Mono | 400 | 0.75rem | ✅ `> PORTFOLIO.SELECTED` |
| Section Title | JetBrains Mono | 700 | 2.5-4rem | ✅ "THE WORK" |

**Bento Cards:**
| Element | Font | Weight | Size | Notes |
|---------|------|--------|------|-------|
| Card Label (Top) | JetBrains Mono | 400 | 0.7rem | ✅ e.g. "VISUAL IDENTITY" |
| Card Title | **Inter** | **800** | 1.5-2rem | ✅ Project name |
| Tech Stack | JetBrains Mono | 400 | 0.75rem | ✅ e.g. "Illustrator, Figma" |
| "View System" Link | Inter | 600 | 0.875rem | ✅ Letter-spacing: 0.05em |

---

### **👤 ABOUT SECTION**

| Element | Font | Weight | Size | Notes |
|---------|------|--------|------|-------|
| Eyebrow Label | JetBrains Mono | 400 | 0.75rem | ✅ `> STUDIO.PROFILE` |
| Section Title | JetBrains Mono | 700 | 2-3rem | ✅ "THE SELF-TAUGHT EDGE" |
| Body Paragraphs | JetBrains Mono | 400 | 0.95rem | ⚠️ **INCONSISTENT** (should be Inter?) |
| Location Text | JetBrains Mono | 400 | 0.875rem | ✅ "Zimbabwe / Remote" |

**Tech Stack Card:**
| Element | Font | Weight | Size | Notes |
|---------|------|--------|------|-------|
| Card Eyebrow | JetBrains Mono | 400 | 0.75rem | ✅ `> TECHNICAL.STACK` (cyan-400) |
| Category Headers | Inter | 700 | 0.875rem | ✅ "Visual", "Build", etc. |
| List Items | JetBrains Mono | 400 | 0.8rem | ✅ Stack items |

---

### **📧 CONTACT SECTION**

| Element | Font | Weight | Size | Notes |
|---------|------|--------|------|-------|
| Eyebrow Label | JetBrains Mono | 400 | 0.75rem | ✅ `> CONTACT.FORM` |
| Section Title | JetBrains Mono | 700 | 2-3rem | ✅ "LET'S WORK TOGETHER" |
| Form Inputs | Inter | 400 | Default | ✅ Placeholder text |
| Submit Button | Inter | 600 | Default | ✅ "SEND MESSAGE" |

---

### **🔻 FOOTER**

| Element | Font | Weight | Size | Notes |
|---------|------|--------|------|-------|
| Logo/Monogram | Inter | 800 | 2rem | ✅ "GB" initials |
| Navigation Links | Inter | 500 | 1.125rem | ✅ "About", "Work", "Contact" |
| Copyright Text | System Monospace | 400 | 0.75rem | ⚠️ **INCONSISTENT** (should specify) |

---

## **🚨 ISSUES IDENTIFIED**

### **1. About Section Body Text**
- **Current:** JetBrains Mono 400 (0.95rem)
- **Issue:** Body paragraphs should use Inter for readability
- **Recommendation:** Change to `Inter, 400, 1rem` for better reading experience

### **2. Footer Copyright Text**
- **Current:** Generic `monospace` font
- **Issue:** Not aligned with brand typography system
- **Recommendation:** Change to `JetBrains Mono, 400, 0.75rem` for consistency

### **3. Card Title Font Mismatch**
- **Hero Headline:** Inter ExtraBold 800 ✅
- **Bento Card Titles:** Inter ExtraBold 800 ✅
- **Status:** CONSISTENT ✅

---

## **✅ CORRECT USAGE PATTERNS**

1. **Eyebrow Labels:** JetBrains Mono 400, 0.7-0.75rem (consistently applied)
2. **Section Titles:** JetBrains Mono 700, 2-4rem (consistently applied)
3. **Buttons/CTAs:** Inter 600 (consistently applied)
4. **Main Headlines:** Inter 800 (consistently applied)
5. **Tech/Code Labels:** JetBrains Mono 400 (consistently applied)

---

## **📋 RECOMMENDED FIXES**

```typescript
// ABOUT SECTION - Body Text
// FROM:
style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.95rem', lineHeight: '1.8' }}

// TO:
style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', lineHeight: '1.8' }}
```

```typescript
// FOOTER - Copyright Text
// FROM:
style={{ fontFamily: 'monospace', fontSize: '0.75rem' }}

// TO:
style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem' }}
```

---

## **FINAL TYPOGRAPHY SYSTEM**

### **Typeface Roles:**
- **Inter:** Headlines (800), Buttons (600), Body Text (400), Navigation (500)
- **JetBrains Mono:** Eyebrows/Labels (400), Section Titles (700), Tech Stacks (400)

### **Size Scale:**
- **Eyebrows:** 0.7-0.75rem
- **Body Text:** 0.95-1rem
- **Buttons:** 0.875rem
- **Section Titles:** 2-4rem
- **Main Headlines:** 3-6rem

---

**Status:** 95% Consistent ✅  
**Priority Fixes:** 2 minor adjustments needed
