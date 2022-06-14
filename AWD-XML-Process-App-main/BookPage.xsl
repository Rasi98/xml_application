<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:template match="/catalog">
        <html>
            <body>
                <h2>Books List</h2>
                <h2>Price less than $10 &amp; sorted on price</h2>
                <table border="1" cellpadding="3">
                    <tr bgcolor="lightgreen">
                        <th>Title</th>
                        <th>Author</th>
                        <th>Genre</th>
                        <th>Price</th>
                        <th>Description</th>
                    </tr>
                    <xsl:for-each select="book">
                        <xsl:sort select="price"/>
                        <xsl:if test="price &lt; 10">
                            <tr>
                                <td>
                                    <xsl:value-of select="title"/>
                                </td>
                                <td>
                                    <xsl:value-of select="author"/>
                                </td>
                                <td>
                                    <xsl:value-of select="genre"/>
                                </td>
                                <td>
                                    <xsl:value-of select="price"/>
                                </td>
                                <td>
                                    <xsl:value-of select="description"/>
                                </td>
                            </tr>
                        </xsl:if>

                    </xsl:for-each>
                </table>
                <h2>Price greater than $10 &amp; sorted on price</h2>
                <table border="1" cellpadding="3">
                    <tr bgcolor="lightgreen">
                        <th>Title</th>
                        <th>Author</th>
                        <th>Genre</th>
                        <th>Price</th>
                        <th>Description</th>
                    </tr>
                    <xsl:for-each select="book">
                        <xsl:sort select="price"/>
                        <xsl:if test="price &gt; 10">
                            <tr>
                                <td>
                                    <xsl:value-of select="title"/>
                                </td>
                                <td>
                                    <xsl:value-of select="author"/>
                                </td>
                                <td>
                                    <xsl:value-of select="genre"/>
                                </td>
                                <td>
                                    <xsl:value-of select="price"/>
                                </td>
                                <td>
                                    <xsl:value-of select="description"/>
                                </td>
                            </tr>
                        </xsl:if>

                    </xsl:for-each>
                </table>
                <h2>Add new book</h2>
                <form>
                    <label for="name">Name:</label><br/>
                    <input type="text" id="name" name="name"/><br/>
                    <label for="author">Author:</label><br/>
                    <input type="text" id="author" name="author"/><br/>
                    <label for="genre">Genre:</label><br/>
                    <input type="text" id="genre" name="genre"/><br/>
                    <label for="price">Price:</label><br/>
                    <input type="number" id="price" name="price"/><br/>
                    <label for="description">Description:</label><br/>
                    <input type="text" id="description" name="description"/><br/><br/>
                    <input type="button" name="Submit" id="Submit" value="Add" onclick="AddBook()" />
                </form>
                <script src="BookPage.js"/>
            </body>
        </html>
    </xsl:template>

</xsl:stylesheet>