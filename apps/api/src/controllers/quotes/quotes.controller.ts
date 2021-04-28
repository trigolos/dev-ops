import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { QuotesService } from '../../services/quotes/quotes.service';
import { QuoteDto } from '@dev-ops/api-interfaces';
import { createResponse } from '../../utils/http';

@Controller('api/quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Get()
  getAll() {
    return this.quotesService.getAll();
  }

  @Get('random')
  getRandom(@Query('tag') tag?: string) {
    if (tag) {
      const quote = this.quotesService.getRandomByTag(tag);
      if (quote) {
        return quote;
      }
      throw new NotFoundException(`Quote with tag ${tag} not found`);
    }

    return this.quotesService.getRandom();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    const quote = this.quotesService.getById(id);
    if (quote) {
      return quote;
    }
    throw new NotFoundException(`Quote with id ${id} not found`);
  }

  @Post()
  createQuote(@Body() createQuoteDto: QuoteDto) {
    return this.quotesService.createQuote(createQuoteDto);
  }

  @Put(':id')
  updateQuote(@Param('id') id: string, @Body() updateQuoteDto: QuoteDto) {
    const updatedQuote = this.quotesService.updateQuote(id, updateQuoteDto);
    if (updatedQuote) {
      return updatedQuote;
    }
    throw new NotFoundException(`Quote with id ${id} not found`);
  }

  @Delete(':id')
  deleteQuote(@Param('id') id: string) {
    const deletedQuote = this.quotesService.deleteQuote(id);
    if (deletedQuote) {
      return {};
    }
    throw new NotFoundException(`Quote with id ${id} not found`);
  }
}
