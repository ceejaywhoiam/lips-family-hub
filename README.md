# LIPS Family Hub

# LIPS Family Website Build Prompt



## Objective and Audience



Build a complete multi-page website for the LIPS Family, a streaming/content creation family and agency. The site serves two primary audiences: potential recruits who want to join either the family or the agency, and general visitors seeking information about the brand, leadership, merchandise, and contact options.



The business goal is to establish an online presence that clearly communicates what LIPS stands for, showcases leadership, facilitates recruitment applications, and provides contact channels for inquiries.



## Pages and Navigation



Create a **hovering navigation bar** that remains accessible across all pages. The navigation must include exactly five items:

- Home

- Leadership

- Recruitment

- Merch

- Contact Info



### Page 1: Home

- Display a **hero image of the LIPS Family Logo** as the primary visual element

- Include a **brief description** explaining what LIPS stands for

- List the **platforms** the LIPS Family is active on



### Page 2: Leadership

- Display a **name badge** with the **LIPS Family Logo** positioned next to it

- The name badge must include fields for:

  - Name

  - Position

- Include a **frame for a photo** of each leadership member



### Page 3: Recruitment

This is the primary application page. Users choose between two paths:



**Option A: Join the Agency**

Required fields:

- Streaming platform they use

- Streaming name

- Email address



**Option B: Join the Family**

Required fields:

- How long they've been streaming

- What kind of content they create

- What they can bring to the family individually to stand out and help the brand

- Email address

- List of streaming platforms they use

- Streaming name



After submitting, display a **notice** stating: "A response will be given within 7 days. Thank you for your application."



### Page 4: Merch

- Display the text **"Under Construction"**



### Page 5: Contact Info

- Include an **open form** for visitors to inquire about anything app/web related



## Content Requirements



- The Home page description must explain what the LIPS acronym stands for (use placeholder text if not provided)

- List all platforms the LIPS Family is on (use placeholders if not specified)

- All form labels must be clear and descriptive

- The recruitment form must clearly distinguish between the "family" and "agency" options

- The 7-day response notice must appear verbatim as quoted above

- Contact form should be open-ended for app/web inquiries



## Layout and Visual System



- Use a **hovering navigation** style consistent across all pages

- Hero image of the LIPS Family Logo should dominate the Home page above the fold

- Leadership page should present each member with a badge, photo frame, and logo in a cohesive card-like arrangement

- Recruitment page should present the two application paths clearly, possibly as selectable options

- Merch page should be minimal, showing only the under-construction notice

- Contact page should present a simple form layout



## Interactions



- Navigation links must respond to hover states

- Recruitment form should conditionally reveal fields based on whether the user selects "family" or "agency"

- Form submissions should show the 7-day response notice upon completion

- All forms should validate required fields before submission



## Responsive and Accessibility Behavior



- Layout must adapt for mobile, tablet, and desktop viewports

- Navigation must remain usable and accessible on all screen sizes

- Ensure sufficient color contrast for text and UI elements

- Form inputs must have associated labels for screen readers

- All images must have appropriate alt text



## Assets and Technical Requirements



- Use the **LIPS Family Logo** for the hero image, leadership badges, and branding elements

- Use placeholder image frames for leadership photos

- No specific technical stack has been specified — remain flexible and choose appropriate standard web technologies

- Use placeholder text for any content not explicitly provided in the brief



## Acceptance Criteria



The website is complete when:

1. All five navigation items appear in a hovering navigation bar on every page

2. Home page displays the LIPS Family Logo hero image with a description and platform list

3. Leadership page shows name badges with the logo, name/position fields, and photo frames

4. Recruitment page offers both family and agency application paths with the correct conditional fields for each

5. The 7-day response notice appears after recruitment form submission

6. Merch page displays "Under Construction"

7. Contact page provides an open inquiry form

8. All forms function with validation

9. The site is fully responsive and accessible

10. All placeholder content is clearly marked for later replacement

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://lips-family-hub.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/d27afbf1-791c-4502-a050-c7aaa5848a30).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
