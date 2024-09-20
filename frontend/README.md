# CSCI5709 Group Proposal 

## Nomadic
The primary goal of the Nomadic project is to create a comprehensive platform that facilitates the management and booking of tours and travel packages. The platform aims to provide an easy-to-use interface for travelers to discover, book, and manage tours, while also offering robust tools for travel agents and tour operators to organize and promote their travel offerings.


* *Date Created*: 24 June 2024
* *Last Modification Date*: 24 June 2024
* *Git URL*: <https://git.cs.dal.ca/snehp/csci-5709-grp-10/-/tree/main>
* *Github URL*: <https://github.com/smit0086/csci-5709-grp-10>
* *Deployed URL*: <https://csci-5709-g10.netlify.app/>


## Authors

* [Sneh Patel](mailto:sn372821@dal.ca) - *(Creator)*
* [Meer Patel](mailto:mr418607@dal.ca) - *(Creator)*
* [Smit Patel](mailto:Smit.patel@dal.ca) - *(Creator)*
* [Heli Desai](mailto:Helidesai8@dal.ca) - *(Creator)*
* [Vyansi Diyora](mailto:sn372821@dal.ca) - *(Creator)*
* [Parth Patel](mailto:pr410642@dal.ca) - *(Creator)*


## Getting Started

The initial structure of this project was established using [vite](https://vitejs.dev/guide/).

### Prerequisites
To get started with this project on your computer, you'll need to install the following software, libraries, or plugins.

* To verify if Git is installed on your system, you can execute the following command in the terminal:
    ```
    git --version
    ```
* Node
    To verify if Node is installed on your system, you can execute the following command in the terminal:
    ```
    node --version
    ```
* A web browser like Google Chrome or Firefox


### Installing

A step by step series of examples that tell you how to get a development env running

1. Clone this repository to your local system

```
git clone https://git.cs.dal.ca/snehp/csci-5709-grp-10/-/tree/main
```

2. Change the current directory to cloned repository

```
cd csci-5709-grp-10/frontend
```

3. Install required dependencies

```
npm install
```

4. Run the project

```
npm run dev
```

To run the app in development mode, follow these steps:
1. Open your web browser and navigate to http://localhost:5173.
2. The app will load in your browser, and any changes you make will automatically trigger a page reload.

## Available Scripts

### `npm run dev`
To run the app in development mode, you can execute the following command:
```
npm run dev
```
After running the command, open your web browser and navigate to http://localhost:5173 to view the app. Any changes you make will automatically trigger a page reload.

### `npm run build `
```
npm run build
```
Builds the app for production. The builded app is optimized for best performance and can found in `dist` folder.

## Deployment

To publish your website after completing the setup and following all the steps mentioned above, you can follow these instructions:

1. Log in to Netlify using your GitHub account.
2. Choose the repository you wish to deploy.
3. Once you have selected the repository, Netlify will automatically deploy your website.

## Built With

* [React](https://reactjs.org/) - Frontend Framework
* [NPM](https://www.npmjs.com/) - The package manager for  [Node](https://nodejs.org/)
* [Visual Studio Code](https://code.visualstudio.com/download) - The source code editor used
* [Netlify](https://www.netlify.com/) - For application deployment
* [GitHub](https://github.com/) - The version control tool
* [Google Chrome](https://www.google.com/intl/en_in/chrome/) - Browser used to visualize the changes

## External Dependencies Used
[@mui/icons-material](https://mui.com/material-ui/material-icons/)- `^5.15.20`
- Material-UI is a popular React UI framework. The `@mui/icons-material` package provides a collection of icons that can be used in Material-UI applications.

[@mui/material](https://mui.com/components/)- `^5.15.20`
- MUI Core components are a suite of high-quality, reusable UI components based on Material Design.

[react-router-dom](https://reactrouter.com/) - `^6.23.1`
- React Router DOM provides routing functionalities for React applications, allowing for declarative routing.

[tailwind](https://tailwindcss.com/)- `^3.4.4`
- Tailwind CSS is a highly customizable, low-level CSS framework that provides utility classes for building responsive and modern user interfaces.

[react-hook-form](https://react-hook-form.com/)- `^7.52.0`
 * React Hook Form is a library for managing form state in React using hooks.

[Typescript](https://www.typescriptlang.org)- `^4.9.5`
- Typescript is a typed superset of JavaScript that compiles to plain JavaScript. It adds static typing and other features to JavaScript, making it more robust and scalable for large-scale applications.

[react-slick](https://www.npmjs.com/package/react-slick)- `^0.30.2`
-   React Slick is a carousel component for React applications.
 * It provides a simple and customizable way to create image sliders, carousels, and other similer UI Component 

## Sources Used
### frontend/src/components/FAQ.tsx
*Lines 113 -124
```js
<Accordion
    key={index}
    expanded={expanded === `panel${index}`}
    onChange={handleChange(`panel${index}`)}
>
<AccordionSummary aria-controls={`panel${index}d-content`} id={`panel${index}d-header`}>
    <Typography>{faq.question}</Typography>
</AccordionSummary>
<AccordionDetails>
    <Typography>{faq.answer}</Typography>
</AccordionDetails>
</Accordion>
```
This code is adapted from [Material UI](https://mui.com/material-ui/react-accordion/) as shown below
```js
    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Collapsible Group Item #1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
```

## Acknowledgments
* The provided code was instrumental in getting started with the assignment. I would like to express my gratitude to all the authors for their hard work.

## References

- [1]“unDraw | Colorful illustrations,” Undraw.co, 2019. (Online) Available: https://undraw.co/illustrations (accessed Jun. 24, 2024).
- [2]“React Accordion component - Material UI,” mui.com. (Online)  Available: https://mui.com/material-ui/react-accordion/ (accessed Jun. 24, 2024).
- [3]“Travel World Tour Vector PNG Images, Tour And Travel Logo, Tour, Travel, Logo PNG Image For Free Download,” Pngtree. (Online) Available:https://pngtree.com/freepng/tour-and-travel-logo_5695483.html (accessed Jun. 25, 2024).