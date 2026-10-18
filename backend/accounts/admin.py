from django.contrib import admin
from .models import CustomUser, Sender, Rep, Company, RepCompanyAssignment, LevelDetail, CompanyCampaignLevel 

# Register your models here.
admin.site.register(Sender)


# uses customuser as its primary key (primary_key=True), so there's no id field — the PK is customuser_id
@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'email') #controls columns shown in the list/changelist view
    readonly_fields = ('id',) #readonly_fields — makes id visible (but not editable) on the detail/edit form


# @admin.register(Sender)
# class SenderAdmin(admin.ModelAdmin):
#     list_display = ('id', 'email') #controls columns shown in the list/changelist view
#     readonly_fields = ('id',) #readonly_fields — makes id visible (but not editable) on the detail/edit form


