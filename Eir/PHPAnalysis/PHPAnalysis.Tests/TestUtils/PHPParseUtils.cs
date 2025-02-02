﻿using System.Xml;
using PHPAnalysis.Parsing;
using PHPAnalysis.Parsing.AstTraversing;

namespace PHPAnalysis.Tests.TestUtils
{
    public static class PHPParseUtils
    {
        public static XmlNode ParsePHPCode(string phpCode, string phpParser)
        {
            var fileParser = new FileParser(phpParser);

            using (var fileManager = new TempFileManager())
            {
                string file = fileManager.WriteContent(phpCode);
                var xml = fileParser.ParsePHPFile(file);
                return xml;
            }
        }


        public static T ParseAndIterate<T>(string phpCode, string phpParser) where T : IXmlVisitor, new()
        {
            XmlNode ast = ParsePHPCode(phpCode, phpParser);
            var traverser = new XmlTraverser();
            var visitor = new T();
            traverser.AddVisitor(visitor);
            traverser.Traverse(ast.FirstChild.NextSibling);
            return visitor;
        }
    }
}
