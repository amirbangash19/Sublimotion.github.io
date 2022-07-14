
// This namespace
// #require "dan.js"
if (!window.dan)
    window.dan = {};


dan.findStylesheetWithHref = function (i_href, i_matchSuffix)
// Get a stylesheet attached to the current document by its href.
//
// Params:
//  i_href:
//   (string)
//   The href of the stylesheet to get.
//  i_matchSuffix:
//   Either (boolean)
//    true:
//     i_href must match the stylesheet's href exactly, for that stylesheet to be returned.
//    true:
//     i_href only has to match the end of the stylesheet's href, for that stylesheet to be returned.
//     In other words i_href can be a relative URL, which may be easier for the caller to specify,
//     whereas the URLs in the DOM stylesheet list are always absolute.
//   or (null or undefined)
//    Use default of false.
//
// Returns:
//  Either (CSSStyleSheet)
//   The stylesheet object.
//  or null
//   A stylesheet with the specified href was not found.
{
    for (var stylesheetNo = 0; stylesheetNo < document.styleSheets.length; ++stylesheetNo)
    {
        var stylesheet = document.styleSheets[stylesheetNo];
        if (!i_matchSuffix)
        {
            if (stylesheet.href == i_href)
                return stylesheet;
        }
        else
        {
            if (stylesheet.href &&
                stylesheet.href.slice(-i_href.length) == i_href)
                return stylesheet;
        }
    }

    return null;
};

dan.findStylesheetWithFilename = function (i_filename)
// Params:
//  i_filename: (string)
//
// Returns:
//  Either (StyleSheet)
//  or (null)
{
    var re = new RegExp(".*\\/" + i_filename + "$");
    for (var stylesheetNo = 0; stylesheetNo < document.styleSheets.length; ++stylesheetNo)
    {
        var stylesheet = document.styleSheets[stylesheetNo];
        if (re.test(stylesheet.href))
            return stylesheet;
    }
    return null;
};

dan.appendRuleToStylesheet = function (i_stylesheet, i_ruleText)
// Params:
//  i_stylesheet: (StyleSheet)
//  i_ruleText: (string)
{
    i_stylesheet.insertRule(i_ruleText, i_stylesheet.cssRules.length);
};

dan.getCssRuleBySelectorText = function (i_stylesheet, i_selectorText)
// Get the first rule in a stylesheet which has a particular selector text.
//
// Params:
//  i_stylesheet:
//   (CSSStyleSheet)
//   The CSSStyleSheet object of the stylesheet to find the rule in.
//  i_selectorText:
//   (string)
//   The selector text of the rule to get.
//
// Returns:
//  Either (CSSRule)
//   The rule object.
//  or null
//   A rule with the specified selector was not found.
{
    for (var ruleNo = 0; ruleNo < i_stylesheet.cssRules.length; ++ruleNo)
    {
        var rule = i_stylesheet.cssRules[ruleNo];

        if (rule.selectorText == i_selectorText)
        {
            return rule;
        }
    }

    return null;
};

dan.findRulesWithSelectorText = function (i_stylesheet, i_selectorText)
// Get all of the rules in a stylesheet which have a particular selector text.
//
// Params:
//  i_stylesheet:
//   (CSSStyleSheet)
//   The CSSStyleSheet object of the stylesheet to find the rule in.
//  i_selectorText:
//   (string)
//   The selector text of the rules to get.
//
// Returns:
//  (array of integer numbers)
//  The indices in i_stylesheet.cssRules of the rules which had the specified selector.
//
// (from WATMM user script, see there for example usage)
{
    var ruleNos = [];

    for (var ruleNo = 0; ruleNo < i_stylesheet.cssRules.length; ++ruleNo)
    {
        var rule = i_stylesheet.cssRules[ruleNo];

        if (rule.selectorText == i_selectorText)
            ruleNos.push(ruleNo);
    }

    return ruleNos;
};


dan.transformCssQuantity = function (i_cssString, i_transformFunction)
// Params:
//  i_cssString:
//   (string)
//   A string representation of a numeric quantity which may include a units suffix
//   eg.
//    15px
//    20.5%
//    40 em
//    50
//  i_transformFunction:
//   (function)
//   A function to use to transform the numeric quantity
//   Function has
//    Params:
//     i_number:
//      (number)
//      The numeric part of i_cssString, with any units removed, and converted to number type.
//    Returns:
//     (number)
//     The number after transformation
//
// Returns:
//  (string)
//  The transformed number, converted back to a string,
//  with any original units, if present, re-suffixed.
{
    var unitsStartPos = i_cssString.search(/[^\-0-9.]/);
    var number, units;
    if (unitsStartPos == -1)
    {
        number = parseFloat(i_cssString);
        units = "";
    }
    else
    {
        number = parseFloat(i_cssString.slice(0, unitsStartPos));
        units = i_cssString.slice(unitsStartPos);
    }

    //
    number = i_transformFunction(number);

    //
    return number.toString() + units;
};